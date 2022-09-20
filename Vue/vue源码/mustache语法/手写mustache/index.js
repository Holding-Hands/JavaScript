import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";
window.mustache = {
    render(templateStr, data) {
        // 将模板 字符串 变为 tokens数组
        const tokens = parseTemplateToTokens(templateStr)
        // 将tokens数组 变为dom字符串
        const domStr = renderTemplate(tokens, data)

        return domStr
    }
}

