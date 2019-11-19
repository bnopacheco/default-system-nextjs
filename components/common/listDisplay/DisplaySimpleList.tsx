import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Utils from '../../../utils/Utils';
import { useStyles } from './DisplaySimpleListStyle';

function DisplaySimpleList({ ...props }) {
    const classes = useStyles(useTheme());

    const width = props.width;
    const title = props.title;
    const list = props.list;

    const fisrtObject = props.list[0];
    const keys = Object.keys(fisrtObject);
    const numberColumn = keys.length;
    let sizeColumns = 100 / numberColumn;
    let sizes: number[];
    if (props.sizes && props.sizes.length === keys.length) {
        sizes = props.sizes;
    }

    return (
        <div style={{ width: `${width}` }}>
            {title && <div className={classes.title}>{title}</div>}
            <div className={classes.header}>
                {
                    keys.map((key: string, index: number) => {

                        if (sizes) {
                            sizeColumns = sizes[index];
                        }

                        return <div key={index} className={classes.cell} style={{ width: `${sizeColumns}%` }}>
                            {Utils.firstUppercase(key)}
                        </div>;
                    })
                }

            </ div>
            {
                list.map((line: any, index: number) => {
                    return <div key={index} className={classes.line}>
                        {
                            keys.map((key: string, i: number) => {

                                if (sizes) {
                                    sizeColumns = sizes[i];
                                }

                                return <div key={i} className={classes.cell} style={{ width: `${sizeColumns}%` }}>
                                    {line[key]}
                                </div>;
                            })
                        }
                    </div>;

                })
            }
        </ div>
    );
}

DisplaySimpleList.propTypes = {
    width: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
};

export default DisplaySimpleList;
