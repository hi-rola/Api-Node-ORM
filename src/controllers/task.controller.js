import Task from '../models/Task';

export async function createTask(req, res) {
    try {
        const {
            name,
            done,
            projectid
        } = req.body;

        let newTask = await Task.create({
            name,
            done,
            projectid
        }, {
            fields: ['name', 'done', 'projectid']
        });

        if (newTask) {
            return res.json({
                message: 'Task created successfully.',
                data: newTask
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}

export async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'projectid', 'name', 'done'],
            order: [
                ['id', 'ASC']
            ]
        });

        res.json({
            data: tasks
        });

    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}

export async function getTaskById(req, res) {
    try {
        const {
            id
        } = req.params;

        const task = await Task.findOne({
            attributes: ['id', 'projectid', 'name', 'done'],
            where: {
                id
            }
        });

        res.json({
            data: task
        });

    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const {
            id
        } = req.params;

        console.log(id)

        const deleteRowCount = await Task.destroy({
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

export async function updateTask(req, res) {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            done,
            projectid
        } = req.body;

        let task = await Task.findOne({
            attributes: ['name', 'projectid', 'done', 'id'],
            where: {
                id
            }
        });

        const updatedTask = await Task.update({
            name,
            done,
            projectid
        }, {
            where: {
                id
            }
        });

        res.json({
            message: 'Task updated successfully',
            data: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}

export async function getTaskByProject(req, res) {
    try {
        const { projectid } = req.params;

        const taskProject = await Task.findAll({
            attributes: ['id', 'projectid', 'name', 'done'],
            where: { projectid }
        });

        res.json({
            data: taskProject
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong.',
            data: {}
        });
    }
}