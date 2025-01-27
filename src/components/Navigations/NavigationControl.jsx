import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ReportAnalytics from "../../pages/Admin/Analytics/ReportAnalytics";
import Login from "../../pages/Admin/Authentication/Login";
import SignUp from "../../pages/Admin/Authentication/SignUp";
import DiscrepancyList from "../../pages/Admin/Discrepancy/DiscrepancyList";
import UserManagement from "../../pages/Admin/Management/UserManagement";
import SchoolsManagement from "../../pages/Admin/Management/SchoolsManagement";
import InventoryManagement from "../../pages/Admin/Management/InventoryManagement";
import AdminDashboard from "../../pages/Admin/Dashboard/AdminDashboard";
import AdminPushNotification from "../../pages/Admin/PushNotification/AdminPushNotification";
import DiscrepancyDetail from "../../pages/Admin/Discrepancy/DiscrepancyDetail";
import CreateNewUser from "../../pages/Admin/User/CreateNewUser";
import AddSchool from "../../pages/Admin/School/AddSchool";
import AddNewItem from "../../pages/Admin/Inventory/AddNewItem";
import GenerateInventory from "../../pages/Admin/Inventory/GenerateInventory";
import ItemDetail from "../../pages/Admin/Inventory/ItemDetail";
import SchoolDetail from "../../pages/Admin/School/SchoolDetail";
import UserDetail from "../../pages/Admin/User/UserDetail";
import WareHouseDashboard from "../../pages/WareHouseStaff/Dashboard/WareHouseDashboard";
import WareHouseInventory from "../../pages/WareHouseStaff/Inventory/WareHouseInventory";
import WareHouseTrack from "../../pages/WareHouseStaff/TrackMaterial/WareHouseTrack";
import ReportDiscrepancy from "../../pages/WareHouseStaff/ReportDiscrepancy/ReportDiscrepancy";
import ScanMaterial from "../../pages/WareHouseStaff/ScanMaterial/ScanMaterial";
import WareHousePushNotification from "../../pages/WareHouseStaff/PushNotification/WareHousePushNotification";
import WareHouseGenerateReport from "../../pages/WareHouseStaff/Inventory/WareHouseGenerateReport";
import WareHouseAddItem from "../../pages/WareHouseStaff/Inventory/WareHouseAddItem";
import WareHouseViewItem from "../../pages/WareHouseStaff/Inventory/WareHouseViewItem";
import WareHouseAddMovement from "../../pages/WareHouseStaff/TrackMaterial/WareHouseAddMovement";
import HeadTeacherDashboard from "../../pages/HeadTeacher/Dashboard/HeadTeacherDashboard";
import HeaderTeacherInventory from "../../pages/HeadTeacher/Inventory/HeaderTeacherInventory";
import HeaderTeacherGenerateReport from "../../pages/HeadTeacher/Inventory/HeaderTeacherGenerateReport";
import HeadTeacherRequestMaterial from "../../pages/HeadTeacher/RequestMaterial/HeadTeacherRequestMaterial";
import HeadTeacherReportDiscrepancy from "../../pages/HeadTeacher/ReportDiscrepancy/HeadTeacherReportDiscrepancy";
import HeadTeacherPushNotification from "../../pages/HeadTeacher/PushNotification/HeadTeacherPushNotification";
import HeadTeacherTrackMaterial from "../../pages/HeadTeacher/TrackMaterial/HeadTeacherTrackMaterial";
import PrivateRoute, {
  PrivatteWareHouseRoute,
  PrivatteAdminRoute,
  PrivatteHeadTeacherRoute,
  PrivatteAuthentactionRoute,
  PrivatteQARoute,
} from "../../utils/PrivateRoute";
import Logout from "../../pages/Admin/Authentication/Logout";
import NotificationDisplay from "../Notification/NotificationDisplay";
import Setting from "../../pages/Settings/Setting";
import Translate from "../../pages/Settings/Translate";
import Profile from "../../pages/Settings/Profile";
import QualityDashboard from "../../pages/QualityAssurance/QualityDashboard/QualityDashboard";
import ApprovalDetail from "../../pages/QualityAssurance/QualityDashboard/ApprovalDetail";
import QualityPushNotification from "../../pages/QualityAssurance/QualityPushNotification/QualityPushNotification";
import EditSchool from "../../pages/Admin/School/EditSchool";
import EditUser from "../../pages/Admin/User/EditUser";
import EditItem from "../../pages/Admin/Inventory/EditItem";

function NavigationControl() {
  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={
            <PrivatteAuthentactionRoute>
              <Login />
            </PrivatteAuthentactionRoute>
          }
        />
        <Route
          path="/SignUp"
          element={
            <PrivatteAuthentactionRoute>
              <SignUp />
            </PrivatteAuthentactionRoute>
          }
        />

        <Route element={<PrivateRoute />}>
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Notifications" element={<NotificationDisplay />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Translate" element={<Translate />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ReportDiscrepancy" element={<ReportDiscrepancy />} />
          <Route path="/ItemDetail/:pk" element={<ItemDetail />} />
          <Route path="/AddNewItem" element={<AddNewItem />} />
          <Route path="/EditItem/:pk" element={<EditItem />} />


          <Route element={<PrivatteAdminRoute />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route
              path="/AdminPushNotification"
              element={<AdminPushNotification />}
            />
            <Route path="/DiscrepancyList" element={<DiscrepancyList />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/SchoolsManagement" element={<SchoolsManagement />} />
            <Route
              path="/InventoryManagement"
              element={<InventoryManagement />}
            />
            <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
            <Route
              path="/DiscrepancyDetail/:pk"
              element={<DiscrepancyDetail />}
            />
            <Route path="/CreateNewUser" element={<CreateNewUser />} />
            <Route path="/AddSchool" element={<AddSchool />} />
            <Route path="/GenerateInventory" element={<GenerateInventory />} />
            <Route path="/SchoolDetail/:pk" element={<SchoolDetail />} />
            <Route path="/EditSchool/:pk" element={<EditSchool />} />
            <Route path="/UserDetail/:pk" element={<UserDetail />} />
            <Route path="/EditUser/:pk" element={<EditUser />} />
          </Route>


          <Route element={<PrivatteWareHouseRoute />}>
          <Route path="/WareHouseDashboard" element={<WareHouseDashboard />} />
          <Route path="/WareHouseInventory" element={<WareHouseInventory />} />
          <Route path="/WareHouseTrack" element={<WareHouseTrack />} />
          <Route path="/ScanMaterial" element={<ScanMaterial />} />
          <Route
            path="/WareHousePushNotification"
            element={<WareHousePushNotification />}
          />
          <Route
            path="/WareHouseAddMovement"
            element={<WareHouseAddMovement />}
          />
          </Route>


          <Route element={<PrivatteHeadTeacherRoute />}>
          <Route path="/HeadTeacherDashboard" element={<HeadTeacherDashboard />} />
          <Route
            path="/HeaderTeacherInventory"
            element={<HeaderTeacherInventory />}
          />
          <Route
            path="/HeadTeacherRequestMaterial"
            element={<HeadTeacherRequestMaterial />}
          />

          <Route
            path="/HeadTeacherPushNotification"
            element={<HeadTeacherPushNotification />}
          />
          <Route
            path="/HeadTeacherTrackMaterial"
            element={<HeadTeacherTrackMaterial />}
          />
          </Route>

          <Route element={<PrivatteQARoute />}>
            <Route path="/QaDashboard" element={<QualityDashboard />} />
            <Route path="/ApprovalDetail" element={<ApprovalDetail />} />
            <Route
              path="/QualityPushNotification"
              element={<QualityPushNotification />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default NavigationControl;
