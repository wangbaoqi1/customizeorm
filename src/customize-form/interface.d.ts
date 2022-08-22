import type { Form } from "antd";
import type { ItemTypes } from "./constant";

type FormProps = React.ComponentProps<typeof Form>;
type FormItem = React.ComponentProps<typeof Form.Item>;

/**
 * roWflag是否单独一行
 * type 表单类型
 * show:联动展示dependencies：依赖项，flag
 * */
export interface FormItemType {
    itemProps: FormItem,
    type: ItemTypes,
    roWflag: boolean,
    children: any,
    typeProps: any,
    show: () => ({ dependencies: string[], flag: boolean })
}

/**
 * 自定义表单入参
 * */
export interface FormType {
    formProps: FormProps,
    formItemOption: any[],
    col?: number,
}
/**
 * 一个表单项多个输入框
 */
interface MoreProps {
    item: any[],
    value?: any,
    onChange?: (value: any) => void,

}