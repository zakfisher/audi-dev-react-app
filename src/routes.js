// Layouts
import App from './components/App';

// Pages
import LoadingPage from './pages/LoadingPage/LoadingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ComponentsPage from './pages/ComponentsPage/ComponentsPage';
import NotesPage from './pages/NotesPage/NotesPage';
import NotePage from './pages/NotePage/NotePage';
import GuidePage from './pages/GuidePage/GuidePage';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: LoadingPage
    },
    {
      path: '/components',
      component: ComponentsPage
    },
    {
      path: '/dashboard',
      component: DashboardPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/notes',
      component: NotesPage
    },
    {
      path: '/note/:noteId',
      component: NotePage
    },
    {
      path: '/note/:noteId/:edit',
      component: NotePage
    },
    {
      path: '/onboarding',
      component: GuidePage
    },
    {
      path: '/onboarding/:noteId',
      component: GuidePage
    }
  ]
}];

export default routes;
