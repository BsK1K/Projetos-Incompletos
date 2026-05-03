import sql from "mssql";

const config: sql.config = {
  server: "localhost",
  database: "GameStoreDB",
  options: {
    trustServerCertificate: true
  }
};

export const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect();
