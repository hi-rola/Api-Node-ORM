 import Project from '../models/Project';

 export async function getProjects(req, res) {
     try {
         const projects = await Project.findAll({
             order:[
                 ['deliverydate', 'DESC'],
                 ['id', 'DESC']
             ]
         });
         res.json({
             data: projects
         });

     } catch (error) {
         res.status(500).json({
             message: 'Something goes wrong.',
             data: {}
         });
     }
 }

 export async function createProject(req, res) {
     try {
         const {
             name,
             priority,
             description,
             deliverydate
         } = req.body;
         let newProject = await Project.create({
             name,
             priority,
             description,
             deliverydate
         }, {
             fields: ['name', 'priority', 'description', 'deliverydate']
         });
         if (newProject) {
             return res.json({
                 message: 'Project created successfully.',
                 data: newProject
             });
         }
     } catch (error) {
         res.status(500).json({
             message: 'Something goes wrong.',
             data: {}
         });
     }
 }

 export async function getProjectById(req, res) {
     try {
         const {
             id
         } = req.params;
         const project = await Project.findOne({
             where: {
                 id
             }
         });
         res.json(project);
     } catch (error) {
         res.status(500).json({
             message: 'Something goes wrong.',
             data: {}
         });
     }
 }

 export async function deleteProject(req, res) {
     try {
         const {
             id
         } = req.params;
         const deleteRowCount = await Project.destroy({
             where: {
                 id
             }
         });
         res.json({
             message: 'Project deleted successfully',
             count: deleteRowCount
         });
     } catch (error) {
         res.status(500).json({
             message: 'Something goes wrong.',
             data: {}
         });
     }
 }

 export async function updateProject(req, res) {
     try {
         const { id } = req.params;
         const { name, priority, description, deliverydate } = req.body;
         
         const projects = await Project.findAll({
             attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
             where: {
                 id
             }
         });

         if (projects.length > 0) {
             projects.forEach(async project => {
                 await project.update({
                     name,
                     priority,
                     description,
                     deliverydate
                 });
             });
         }

         res.json({
             message: 'Project updated successfully',
             data: projects
         });

     } catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'Something goes wrong.',
             data: {}
         });
     }
 }


 export async function updateDeliveryDateProject(req, res) {
    try {
        const { id } = req.params;
        let { name, priority, description, deliverydate } = req.body;

        deliverydate = new Date();

        const projects = await Project.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
            where: {
                id
            }
        });

        if (projects.length > 0) {
            projects.forEach(async project => {
                await project.update({
                    name,
                    priority,
                    description,
                    deliverydate
                });
            });
        }

        res.json({
            message: 'Project updated successfully',
            data: projects
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}