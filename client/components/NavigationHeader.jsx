import React from 'react';
import { Container, Menu, Icon, Image } from 'semantic-ui-react';

function NavigationHeader() {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header href='https://brandless.com/'>
            <Icon name='twitter'/>
          </Menu.Item>
          <Menu.Item as='a' href='https://www.google.com/search?q=Talis+Lazdins'>
            Talis Lazdins
          </Menu.Item>
          <Menu.Item as='a' href='https://www.linkedin.com/in/talis-lazdins/'>
            <Icon name='linkedin'/>
          </Menu.Item>
          <Menu.Item as='a' href='https://github.com/lazdinst/'>
            <Icon name='github'/>
          </Menu.Item>
          <Menu.Item as='a' href='https://drive.google.com/file/d/0B-jIfLD_IMykOV9SN09JdmRZZlk/view?usp=sharing' alt='Talis Lazdins Resume'>
            <Icon name='address card outline'/>
          </Menu.Item>          
        </Container>
      </Menu>
    </div>
  );
}

export default NavigationHeader;