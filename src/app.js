import  express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// importing routes 
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';

// initialization
const app = express();

// middelware
app.use(morgan('dev'));
app.use(json());
app.use(cors());

// permite procesar datos enviados desde formularios
app.use(express.urlencoded({extended: false}));

// routes 
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;

