using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Principal;
using System.Text;
using MyCement.Utils;

namespace Ajeelee.LBC.Postgre
{
    public partial class Demo : Page
    {
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            IDBHelper dbHelper = new PostgreHelper();
            string connectionString = "User ID=postgres;Password=admin;Server=192.168.0.226;Port=5432;Database=MonitorDB;";
            string sql = "insert into [RawLog]([ProjectID],[File],[Note]) values('项目编号',@file,'备注')";

            string file = this.textBox1.Text;
            if (!File.Exists(file)) return;

            //获取文件二进制流
            System.IO.FileStream fs = new System.IO.FileStream(file, System.IO.FileMode.Open);
            BinaryReader br = new BinaryReader(fs);
            byte[] b = br.ReadBytes((int)fs.Length);
            fs.Close();

            int r = dbHelper.ExecuteNonQuery(connectionString, CommandType.Text, sql, new Npgsql.NpgsqlParameter("@file", raw_log.File));
        }
    }
}