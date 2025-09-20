// 代码生成时间: 2025-09-21 03:10:20
class SchedulerService {
    "use strict";

    // 构造函数
    constructor() {
        this.scheduledTasks = [];
    }

    /**
     * 添加任务到调度器
     * @param {number} interval 任务执行的间隔时间，单位为毫秒
# 扩展功能模块
     * @param {Function} callback 任务执行的回调函数
     */
    addTask(interval, callback) {
        if (typeof callback !== 'function') {
            throw new Error('提供的callback必须是一个函数');
        }

        const task = setInterval(callback, interval);
        this.scheduledTasks.push(task);
    }
# 增强安全性

    /**
     * 移除特定的任务
     * @param {number} taskIndex 任务在调度器中的索引
# 扩展功能模块
     */
    removeTask(taskIndex) {
# 增强安全性
        const task = this.scheduledTasks[taskIndex];
        if (!task) {
            throw new Error('任务索引无效');
        }
        clearInterval(task);
        this.scheduledTasks.splice(taskIndex, 1);
# NOTE: 重要实现细节
    }

    /**
     * 取消所有任务
     */
    clearAllTasks() {
        this.scheduledTasks.forEach((task) => {
            clearInterval(task);
        });
        this.scheduledTasks = [];
    }
}

// 使用示例
const scheduler = new SchedulerService();

// 添加一个每5秒执行一次的任务
scheduler.addTask(5000, () => {
    console.log('任务执行了！');
});

// 移除已添加的任务
# 改进用户体验
// 需要替换为实际任务索引
// scheduler.removeTask(0);

// 取消所有任务
// scheduler.clearAllTasks();