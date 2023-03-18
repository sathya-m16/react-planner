import { Toaster } from 'react-hot-toast';
import './App.css';
import PageContent from './components/PageContent';
import PageHeader from './components/PageHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.css'

function App() {
  return (
    <>
    <div className="container">
      <PageTitle>PLANNER</PageTitle>
      <div className={styles.app__wrapper}>
        <PageHeader />
      </div>
      <PageContent />
      
    </div>
    <Toaster 
    position='bottom-right'
    toastOptions={{
      style: {
        fontSize: '1.4rem',
      }
    }}/>
    </>
  );
}

export default App;
