/**
 * 将传入的五个参数 组合成对象 返回
 * @param sel 选择器
 * @param data
 * @param children
 * @param text
 * @param elm
 * @return {number}
 */
export default function vnode (sel, data, children, text, elm) {
    return {
        sel,
        data,
        children,
        text,
        elm
    }
}
