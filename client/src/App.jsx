import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";

const LandingPage = lazy(() => import("./pages/landing/LandingPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/auth/RegistrationPage"));
const CustomerDashboard = lazy(
  () => import("./pages/customer/CustomerDashboard"),
);
const MyReservations = lazy(() => import("./pages/customer/MyReservations"));
const CreateReservationPage = lazy(
  () => import("./pages/customer/CreateReservationPage"),
);
const ReservationDetails = lazy(
  () => import("./pages/customer/ReservationDetails"),
);
const ReservationManagement = lazy(
  () => import("./pages/admin/ReservationManagement"),
);
const TableManagement = lazy(() => import("./pages/admin/TableManagement"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AccessDenied = lazy(() => import("./pages/common/AccessDenied"));
const NotFound = lazy(() => import("./pages/common/NotFound"));
import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { user, loading } = useAuth();

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />

            <Route
              path="dashboard"
              element={
                <AuthRoute isAuthenticated={!!user} loading={loading}>
                  <CustomerDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="my-reservations"
              element={
                <AuthRoute isAuthenticated={!!user} loading={loading}>
                  <MyReservations />
                </AuthRoute>
              }
            />
            <Route
              path="new-reservation"
              element={
                <AuthRoute isAuthenticated={!!user} loading={loading}>
                  <CreateReservationPage />
                </AuthRoute>
              }
            />
            <Route
              path="reservation/:id"
              element={
                <AuthRoute isAuthenticated={!!user} loading={loading}>
                  <ReservationDetails />
                </AuthRoute>
              }
            />

            <Route
              path="admin/dashboard"
              element={
                <AdminRoute
                  isAuthenticated={!!user}
                  isAdmin={user?.isAdmin}
                  loading={loading}
                >
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="admin/reservations"
              element={
                <AdminRoute
                  isAuthenticated={!!user}
                  isAdmin={user?.isAdmin}
                  loading={loading}
                >
                  <ReservationManagement />
                </AdminRoute>
              }
            />
            <Route
              path="admin/tables"
              element={
                <AdminRoute
                  isAuthenticated={!!user}
                  isAdmin={user?.isAdmin}
                  loading={loading}
                >
                  <TableManagement />
                </AdminRoute>
              }
            />

            <Route path="access-denied" element={<AccessDenied />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
