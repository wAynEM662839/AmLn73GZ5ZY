// 代码生成时间: 2025-09-18 12:15:26
// 引入IONIC框架的相关模块
import { Component } from '@angular/core';

/**
 * JSON数据格式转换器组件
 * 提供一个简单的界面来输入源JSON，并输出转换后的JSON
 */
@Component({
  selector: 'app-json-data-converter',
  templateUrl: './json-data-converter.component.html',
  styleUrls: ['./json-data-converter.component.scss'],
})
export class JsonDataConverterComponent {
  // 源JSON数据
  srcJson: string = '{}';
  // 转换后的JSON数据
  convertedJson: string = '{}';

  /**
   * 转换JSON数据
   * 尝试将源JSON转换为指定格式，并处理可能的错误
   */
  convertJson(): void {
    try {
      // 尝试解析源JSON
      const srcData = JSON.parse(this.srcJson);

      // 转换JSON数据（示例：将所有属性转换为大写）
      const convertedData = JSON.parse(
        JSON.stringify(srcData, (key, value) => {
          if (typeof value === 'string') {
            return value.toUpperCase();
          }
          return value;
        })
      );

      // 将转换后的数据转换为字符串
      this.convertedJson = JSON.stringify(convertedData, null, 2);
    } catch (error) {
      // 处理解析错误
      console.error('JSON解析错误:', error);
      this.convertedJson = 'JSON解析错误';
    }
  }
}
