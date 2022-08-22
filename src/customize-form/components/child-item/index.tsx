import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, Typography, Upload } from "antd"
import { useContext } from "react"
import { ItemTypes } from "../../constant"
import styles from '../../index.less'
import type { FormItemType } from "../../interface"
import MoreItem from "../more-item"
import WFC from "../WFC"

const ChildItem = (props: { item: FormItemType }) => {
    const { formProps } = useContext(WFC) as any
    const { type, typeProps } = props.item
    const item = props.item
    switch (type) {
        case ItemTypes.TITLE:
            return <Typography.Title{...typeProps}>{item.children}</Typography.Title>
        case ItemTypes.INPUT:
            return <Space className={styles.InputStyles}>{typeProps?.firstText}<Input {...props} placeholder='请输入'  {...typeProps} />{typeProps?.lastText}</Space>
        case ItemTypes.INPUTNUMBER:
            return <InputNumber  {...props} placeholder='请输入' {...typeProps} />
        case ItemTypes.SELECT:
            if (item.children) {
                return <Select  {...props} placeholder='请输入' {...typeProps} > item.children </Select>  //自定义select选择
            }
            return <Select  {...props} placeholder='请输入' {...typeProps} />
        case ItemTypes.RADIO:
            if (item.children) {
                return <Radio.Group  {...props} {...typeProps} > {item.children}</Radio.Group>
            }
            return < Radio.Group  {...props}  {...typeProps} />
        case ItemTypes.TEXTAREA:
            return <Input.TextArea  {...props} placeholder='请输入' {...typeProps} />
        case ItemTypes.UPLOAD:
            if (item.children) {
                return <Upload  {...props} {...typeProps} > {item.children} </Upload>
            }
            return <Upload  {...props}  {...typeProps} />
        case ItemTypes.DRAGGER:
            if (item.children) {
                return <Upload.Dragger  {...props} {...typeProps} >
                    {item.children}
                </Upload.Dragger>
            }
            return <Upload.Dragger  {...props} {...typeProps} />
        case ItemTypes.CASCADER:
            return <Cascader  {...props} {...typeProps} />
        case ItemTypes.CHECKBOX:
            return <Checkbox.Group   {...props}  {...typeProps} />
        case ItemTypes.DATEPICKER:
            return <DatePicker  {...props} {...typeProps} />
        case ItemTypes.RANGEPICKER:
            return < DatePicker.RangePicker  {...props} {...typeProps} />
        case ItemTypes.BUTTON:
            if (item.children) {
                return item.children
            }
            return <Space className={styles.btnStyles}>
                <Button htmlType="button" onClick={() => { formProps.form?.resetFields() }}>
                    重置
                </Button>
                <Button type="primary" htmlType="submit">
                    确定
                </Button>
            </Space>
        case ItemTypes.MOREITEM:
            return <MoreItem {...props} item={item.children} />    //一个表单多个输入框的情况
        case ItemTypes.CUSTOMIZE:
            return <span {...props}>{item.children}</span>    //自定义表单项
    }
}

export default ChildItem