/*
 * 扫描器 类
 */

export default class Scanner {
    constructor(templateStr) {
        // 指针
        this.pos = 0
        // 尾巴 一开始就是templateStr
        this.tail = templateStr
    }
    // 走过指定内容 没有返回值
    scan (flag) {
        if (this.tail.indexOf(flag) === 0) {
            // tag 有多长，就让指针往后移多少位
            this.pos += flag.length
            this.tail = templateStr.slice(this.pos)
        }
    }

    // 让指针进行扫描 直到遇到 指定内容结束，并且返回 结束之前扫描的内容
    scanUtil (endFlag) {
        // 记录执行本方法的时候pos的值
        const back_pos = this.pos
        // 尾巴开头 不是 endFlag 的时候 继续向下查找（没找到endFlag）
        // 这块 需要注意下 防止找不到 一直向下 查找死循环的问题
        while (this.tail.indexOf(endFlag) !== 0 && !this.eos()) {
            // 指针加一
            this.pos++
            // 改变 尾巴 从当前指针这个这个字符串 到 最后全部字符
            this.tail = templateStr.slice(this.pos)
        }
        // return templateStr.slice(0, this.pos) // 不能这么写哦 因为开始不一定是0位置
        return templateStr.slice(back_pos, this.pos)
    }

    // 判断 指针 是否已经到头 end of string
    // this.tail !== '' || this.pos >= templateStr.length
    // 一种就是 tail尾巴是空字符串的时候说明 扫描到了末尾
    // 另一种思路就是指针的位置和字符串的长度相等 说明扫描到了末尾 因为指针从0开始
    eos () {
        return this.pos >= templateStr.length // 已经到头了
    }
}
