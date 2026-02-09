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
import DocDesignHome from "@/Admin/MainLayout/DocDesignHome";
import ID_CardDesign from "@/Admin/MainLayout/ID_CardDesign";
import TransectionRecieved from "@/Admin/MainLayout/TransectionRecieved";
import InsuranceGenerate from "@/Admin/MainLayout/InsuranceGenerate";
import Stamp from "@/Admin/MainLayout/Stamp";
import Checque from "@/Admin/MainLayout/Checque";
import MoneyReciept from "@/Admin/MainLayout/MoneyReciept";
import ManageAdmin from "@/Admin/MainLayout/ManageAdmin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminSignin from "./AdminSignin";
import AdminProfile from "./AdminProfile";
import ApprovalPageGenerator from "@/Admin/MainLayout/ApprovalPageGenerator";
import ManageMassage from "@/Admin/MainLayout/ManageMassage";
import Withdraw from "@/Pages/Withdraw";
import AllUsers from "@/Admin/MainLayout/AllUsers";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={< SignIn />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin_signin" element={<AdminSignin />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/help" element={<Help />} />
                <Route path="/card" element={<Card />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/selectLoan/:phone" element={<LoanCalculator />} />
                <Route path="/request_successfull" element={<RequestSucceessPage />} />
                <Route path="/provide_info/:email" element={<GetUserDetailsInfo />} />
                <Route path="/withdraw_money/:email" element={<Withdraw />} />
            </Route>

            {/* admin routes */}


            <Route element={<AdminProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/admin" element={<AdminDash />} />
                    <Route path="/admin/manage_admin" element={<ManageAdmin />} />
                    <Route path="/admin/abedon_request" element={<M_Abedon />} />
                    <Route path="/admin/abedon_details/:phone" element={<M_A_Details />} />
                    <Route path="/admin/document_design" element={<DocDesignHome />} />
                    <Route path="/admin/document_design/id_card" element={<ID_CardDesign />} />
                    <Route path="/admin/document_design/transaction" element={<TransectionRecieved />} />
                    <Route path="/admin/document_design/insurance" element={<InsuranceGenerate />} />
                    <Route path="/admin/document_design/stamp" element={<Stamp />} />
                    <Route path="/admin/document_design/cheque" element={<Checque />} />
                    <Route path="/admin/document_design/money_receipt" element={<MoneyReciept />} />
                    <Route path="/admin/document_design/approval" element={<ApprovalPageGenerator />} />
                    <Route path="/admin/profile" element={< AdminProfile />} />
                    <Route path="/admin/massages" element={< ManageMassage />} />
                    <Route path="/admin/see_user" element={< AllUsers />} />

                </Route>
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
