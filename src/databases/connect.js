import { Sequelize } from 'sequelize'

export const DB = new Sequelize('yensao', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

export const connectDB = async () => {
  try {
    await DB.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log('Database connect failed')
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
