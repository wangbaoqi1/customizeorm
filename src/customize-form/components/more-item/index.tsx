import { Space } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { ItemTypes } from '../../constant';
import styles from '../../index.less';
import type { FormItemType, MoreProps } from "../../interface";
import ChildItem from "../child-item";

const MoreItem: React.FC<MoreProps> = (props) => {
    const [current, setCurrent] = useState<any>({})
    const newArr = (props.item || []).map((item: FormItemType) => {
        return {
            ...item,
            typeProps: {
                ...item?.typeProps,
                defaultValue: props?.value && props?.value?.[item?.itemProps?.name as any] || current[item?.itemProps?.name as any],
                onChange: (val: any) => {
                    let value = val
                    if ([ItemTypes.INPUT, ItemTypes.RADIO].includes(item.type)) {
                        value = val.target.value
                    }
                    if ([ItemTypes.RANGEPICKER, ItemTypes.DATEPICKER].includes(item.type)) {
                        value = +moment(val).format("X")
                    }
                    const newCurrent = {
                        ...current, [item?.itemProps?.name as any]: value
                    }
                    setCurrent(newCurrent)
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    props?.onChange && props?.onChange(newCurrent)
                }
            }

        }
    })
    return <Space className={styles.ChildrenStyles}>{(newArr || []).map((i, index: number) => {
        return <ChildItem item={i} key={index} />
    })}</Space>
}
export default MoreItem 