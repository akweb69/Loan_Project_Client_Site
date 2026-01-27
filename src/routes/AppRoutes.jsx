import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Layout from "@/Admin/MainLayout/Layout";
import AdminDash from "@/Admin/MainLayout/AdminDash";
import UserLayout from "@/Admin/User/Layout/UserLayout";
import UserDash from "@/Admin/User/Layout/UserDash";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
import GetUserDetailsInfo from "@/Pages/GetUserDetailsInfo";
import LoanCalculator from "@/Pages/LoanSelect";
import RequestSucceessPage from "@/Pages/RequestSucceessPage";
import Help from "@/Pages/help";
import Card from "@/Pages/Card";
import Profile from "@/Pages/Profile";
import M_Abedon from "@/Admin/Pages/M_Abedon";
import M_A_Details from "@/Admin/Pages/M_A_Details";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={< SignIn />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/help" element={<Help />} />
                <Route path="/card" element={<Card />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/selectLoan/:phone" element={<LoanCalculator />} />
                <Route path="/request_successfull" element={<RequestSucceessPage />} />
                <Route path="/provide_info/:email" element={<GetUserDetailsInfo />} />
            </Route>

            {/* admin routes */}
            <Route element={<Layout />}>
                <Route path="/admin" element={<AdminDash />} />
                <Route path="/admin/abedon_request" element={<M_Abedon />} />
                <Route path="/admin/abedon_details/:phone" element={<M_A_Details />} />

            </Route>
            {/* user Dashboard routes */}
            <Route element={<UserLayout />}>
                <Route path="/dashboard" element={<UserDash />} />

            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
