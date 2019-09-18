import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

function ListMenu() {
    return (
        <List>

          <ListItem button key={"Inbox"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItem>

          <ListItem button key={"Send email"}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={"Send email"} />
          </ListItem>

      </List>
    );
}

export default ListMenu;
