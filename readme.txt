npx sequelize model:generate --name User --attributes name:string,email:string
npx sequelize model:generate --name Role --attributes name:string
npx sequelize model:generate --name UserRole --attributes userId:integer, roleId:integer


auto increment current number
select nextval(pg_get_serial_sequence('farmers', 'id'));
SELECT setval('farmers_id_seq', 792, true);