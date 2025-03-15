import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
// import NavBar from '../component/header-nav/NavBar';
import Header from '../components/header/Header';

function MainLayout() {
    return (
        <div>
            <Header title={'StudyJapan'} />
            {/* <NavBar /> */}
            <Group w={'100%'} justify="center">
                <Group maw={1440} w={'100%'}>
                    <Outlet />
                </Group>
            </Group>
            <Footer />
        </div>
    );
}

export default MainLayout;
