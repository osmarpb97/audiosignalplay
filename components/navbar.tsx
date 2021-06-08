import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  <ol>
    <li>Suma</li>
    <li>Resta</li>
    <li>Amplificación</li>
    <li>Atenuación</li>
    <li>Desplazamiento</li>
    <li>Diezmación</li>
    <li>Interpolación</li>
    <li>Convolución</li>
  </ol>
  const drawer = (
    <div >
      <Divider />
      <List>
        <ListItem button>
          <a href="/suma"><ListItemText>Suma</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/resta"><ListItemText>Resta</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/reflejo"><ListItemText>Reflejo</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/amplificacion"><ListItemText>Amplificación</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/atenuacion"><ListItemText>Atenuación</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/desplazamiento"><ListItemText>Desplazamiento</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/diezmacion"><ListItemText>Diezmación</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/convolucion"><ListItemText>Convolución</ListItemText></a>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <a href="/interpolacion0"><ListItemText>Interpolación 0</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/interpolacionEs"><ListItemText>Interpolación escalon</ListItemText></a>
        </ListItem>
        <ListItem button>
          <a href="/interpolacionLi"><ListItemText>Interpolación lineal</ListItemText></a>
        </ListItem>
      </List>
    </div>
  );


  return (
    <div className="mx-6">
      <nav className="absolute top-3" aria-label="mailbox folders">
        <IconButton
          style={{backgroundColor:"white"}}
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}

        >
          <MenuIcon />
        </IconButton>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

      </nav>
    </div>
  );
}