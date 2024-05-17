npx sequelize model:generate --name User --attributes name:string,email:string
npx sequelize model:generate --name Role --attributes name:string
npx sequelize model:generate --name UserRole --attributes userId:integer, roleId:integer