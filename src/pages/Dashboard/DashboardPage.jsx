import 'bootstrap/dist/css/bootstrap.min.css';
import SideNavbar from "../../layout/SideNavbar.jsx";
import '../../assets/CSS/index.css'
import DashboardMenuFirstPage from "./DashboardMenuFirstPage.jsx";
import DashboardMenuSecondPage from "./DashboardMenuSecondPage.jsx";

const DashboardPage = () => {
     return (
            <SideNavbar>
               <DashboardMenuFirstPage/>
                <DashboardMenuSecondPage/>
            </SideNavbar>
        );
};

export default DashboardPage;