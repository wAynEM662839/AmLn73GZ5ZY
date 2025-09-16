// 代码生成时间: 2025-09-16 19:53:26
import { Injectable } from '@angular/core';
import { PapaParse } from 'ngx-papaparse';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { writeFile } from '@ionic-native/file-transfer/ngx';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

// CSV文件批量处理器服务
@Injectable({
  providedIn: 'root'
})
export class CsvBatchProcessorService {
  constructor(
    private papa: PapaParse,
    private file: File,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  // 处理上传的CSV文件
  async handleCsvFiles(files: FileList): Promise<void> {
    // 显示加载动画
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      // 遍历文件列表
      for (let file of files) {
        // 读取CSV文件内容
        const fileContent = await this.readFile(file);
        const results = this.papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true
        });

        // 处理CSV数据
        const processedData = this.processCsvData(results.data);
        // 保存处理后的数据到新的CSV文件
        await this.saveCsvFile(processedData, 'processed_file.csv');
      }

      // 加载动画消失
      await loading.dismiss();
      // 显示成功消息
      const toast = await this.toastCtrl.create({
        message: 'CSV files processed successfully!',
        duration: 3000
      });
      await toast.present();
    } catch (error) {
      // 加载动画消失
      await loading.dismiss();
      // 显示错误消息
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
      console.error('Error processing CSV files:', error);
    }
  }

  // 读取文件内容
  private async readFile(file: File): Promise<string> {
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.file.readAsText(file, 'UTF-8')
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject('Error reading file: ' + error.message);
          });
      });
    } else {
      // 浏览器环境读取文件内容
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsText(file);
      });
    }
  }

  // 处理CSV数据
  private processCsvData(data: any[]): any[] {
    // 在这里实现具体的CSV数据处理逻辑
    // 例如：过滤、转换、验证数据等
    return data;
  }

  // 保存处理后的数据到新的CSV文件
  private async saveCsvFile(data: any[], fileName: string): Promise<void> {
    const csvContent = this.papa.unparse(data);
    if (this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.file.writeFile(this.file.dataDirectory, fileName, csvContent, { replace: true })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject('Error writing file: ' + error.message);
          });
      });
    } else {
      // 浏览器环境保存文件
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);
    }
  }
}
