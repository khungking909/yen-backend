import { Sequelize } from 'sequelize'
import mysql2 from "mysql2";

export const DB = new Sequelize('bgdhc6nbqbgb1osph6g8', 'u9hcylqlehufsgro', 'muqUVO5eEp7yIifT237E', {
  host: 'bgdhc6nbqbgb1osph6g8-mysql.services.clever-cloud.com',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  dialectModule: mysql2,
})

export const connectDB = async () => {
  try {
    await DB.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log('Database connect failed', error)
  }
}

export const syncDatabase = async (sequelize) => {
  try {
    await sequelize.sync(); // Tạo bảng nếu chưa có
    console.log("Database đã được đồng bộ!");
  } catch (error) {
    console.error("Lỗi đồng bộ:", error);
  }
};
