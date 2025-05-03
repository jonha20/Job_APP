const User = require('../models/user.model');

// Registrar nuevo usuario
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

// Editar perfil de usuario
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, select: '-password' }
        );
        res.json({ message: 'Perfil actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
    }
};

// Borrar usuario (admin)
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

// Obtener lista de usuarios (admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

module.exports = {
    register,
    updateProfile,
    deleteUser,
    getUsers
}; 