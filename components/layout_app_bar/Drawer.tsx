import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import ListMenu from './ListMenu';

function drawer({...props}) {
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent, ) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        props.setOpen(open);
    };

    return (
        <div>
            <Drawer open={props.open} onClose={toggleDrawer(false)}>
                <div style={{width: 250}} role='presentation' >
                    <ListMenu />
                </div>
            </Drawer>
        </div>
    );
}

export default drawer;
