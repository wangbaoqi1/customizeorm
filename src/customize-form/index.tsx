import { Col, Form, Row } from "antd";
import { cloneDeep, isFunction, isNumber } from "lodash";
import { useEffect, useState } from "react";
import ChildItem from "./components/child-item";
import WFC from "./components/WFC";
import { FormType } from "./interface";

const CustomizeForm = (props: FormType) => {
    const { formProps, formItemOption, col = 1 } = props
    const getFormItemOption = (arr: any[]) => {
        return cloneDeep(arr).map(i => {
            if (isFunction(i?.show)) {
                return { ...i, show: i?.show()?.flag, showFun: i?.show() }
            }
            return { ...i, show: true }
        })
    }

    const [itemOptions, setItemOptions] = useState(getFormItemOption(formItemOption))

    const onValuesChange = (val: any, value: unknown) => {
        const filterKeys: string[] = []
        formItemOption.filter(i => (isFunction(i?.show)
            && Array.isArray(i?.show()?.dependencies)
            && i?.show()?.dependencies.length > 0)).forEach(j => {
                filterKeys.push(...(j.show().dependencies))
            })
        if (filterKeys.includes(Object.keys(val)[0])) {
            setItemOptions(getFormItemOption(formItemOption))
        }

        if (isFunction(formProps?.onValuesChange)) {
            formProps?.onValuesChange(val, value)
        }
    }

    // 根据列数修改数据 自定义组件是否需要单独一行roWflag
    const groupArr = (array: any[], subGroupLength: number) => {
        let index = 0;
        const newArray = [];
        // 单独一行的item
        const newArr = array.filter(d => d?.show) //过滤掉隐藏的数据
        const singleRowIndexArr = newArr.map((item, i) => {
            if (item.roWflag) {
                return i
            }
            return item
        }).filter(n => {
            return isNumber(n)
        })
        while (index < newArr.length) {
            if (singleRowIndexArr.includes(index)) {
                newArray.push(...newArr.slice(index, index + 1))
                index += 1
            } else {
                newArray.push(newArr.slice(index, index += subGroupLength));
            }

        }
        return newArray;
    }

    const renderFormItem = (optArr: any[]) => {
        return optArr.map((item: any) => {
            if (Array.isArray(item)) {
                return <Row key={Math.random()}>{
                    item.map(i => <Col span={24 / (item.length)} key={i.name}>
                        <Form.Item rules={[{ required: true }]} {...i.itemProps}>
                            <ChildItem item={i} />
                        </Form.Item>
                    </Col>
                    )}</Row>
            }

            return <Row key={item.name}><Col span={24} ><Form.Item rules={[{ required: true }]} {...item.itemProps}  >
                <ChildItem item={item} />
            </Form.Item></Col></Row>
        })
    }
    useEffect(() => {
        setItemOptions(getFormItemOption(formItemOption))
    }, [])

    const newFormProps = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
        ...formProps,
        onValuesChange
    }
    return <WFC.Provider value={{ formProps: newFormProps, itemOptions, col } as any} >
        <Form  {...newFormProps} >
            {
                renderFormItem(groupArr(itemOptions, col))
            }
        </Form >
    </WFC.Provider>

};
export default CustomizeForm;

