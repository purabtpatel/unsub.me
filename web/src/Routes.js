// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage


import { Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import NavigationLayout from './layouts/NavigationLayout/NavigationLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Audits" titleTo="audits" buttonLabel="New Audit" buttonTo="newAudit">
        <Route path="/audits/new" page={AuditNewAuditPage} name="newAudit" />
        <Route path="/audits/{id}/edit" page={AuditEditAuditPage} name="editAudit" />
        <Route path="/audits/{id}" page={AuditAuditPage} name="audit" />
        <Route path="/audits" page={AuditAuditsPage} name="audits" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={NavigationLayout}>
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
