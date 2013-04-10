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
    /*
     * 注意：
     * 1.查询语句中表名、字段名需用中括号[ ] 封起来，在操作类中会统一替换为双引号。
     * 2.命令语句中的参数名格式为：@或？+ 参数名，在操作类中为统一替换为冒号。
     * 3.对于二进制流、日期等特殊类型需采用2中的参数形式
     * 4.经多次测试postgreSQL数据库只直接支持（冒号+参数名）的参数方式
     * */
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