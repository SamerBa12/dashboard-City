import React from "react";
import { Group, Button, Text, Drawer } from '@mantine/core';
import '../assets/css/header/headre.css'
import { useDisclosure } from '@mantine/hooks';
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { routesPages } from "../routes/router";


const NavHeader = () => {
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false);
  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="header py-4 px-5 container-fluid" style={{ borderRadius: '10px' }} >
      <div height={60} >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className=" g-5">

            <Button variant="outline" onClick={handleSignOut}>
              تسجيل الخروج
            </Button>

          </div>
          <Drawer
            style={{ direction: 'ltr' }}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            offset={8} radius="md" opened={opened} onClose={close} position="left" title="الصفحات">
            {
              routesPages.filter
                (link => link.hasOwnProperty('name')).map((el) => (
                  <div variant="subtle"
                    className="sideBarItem"
                    onClick={() => {
                      navigate(el.path)
                      close()

                    }}
                    key={el.path}
                  >
                    {
                      el.name
                    }
                  </div>

                ))
            }
          </Drawer>


          <Group spacing="md">
            {
              routesPages.filter(link => link.hasOwnProperty('name')).map((el) => (
                <Button variant="subtle"
                  onClick={() => { navigate(el.path) }}
                  key={el.path}
                >
                  {
                    el.name
                  }
                </Button>

              ))
            }
          </Group>
          <Button onClick={open} variant="outline" style={{ border: 'none', fontSize: '25px' }}>
            <BiMenu />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
