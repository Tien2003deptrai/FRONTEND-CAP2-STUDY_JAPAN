import Header from '@/components/header/Header'
import ScrollToTop from '@/components/scroll-to-top/ScrollToTop'
import { Group } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

function MainLayout() {
    return (
        <div>
            <ScrollToTop />
            <Header />
            {/* <NavBar /> */}
            <Group w={'100%'} justify="center">
                <Group maw={1440} w={'100%'}>
                    <Outlet />
                </Group>
            </Group>
            <Footer />
        </div>
    )
}

export default MainLayout
