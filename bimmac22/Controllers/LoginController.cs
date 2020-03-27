using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bimmac22.Connenction;
using bimmac22.Models;
using MyCouch;
using MyCouch.Requests;

namespace bimmac22.Controllers
{
    public class LoginController : Controller
    {
    ConnectionStrings db;
    // GET: Login

    public async Task<Boolean> ValidateUser(UserDetailModel user)
    {
      db = new ConnectionStrings();
      var uriBuilder = db.GetCouchUrl();

      Boolean valid = false;
      using (var client = new MyCouchClient(uriBuilder))
      {
        var notifications = await client.Views.QueryAsync<UserDetailModel>(new QueryViewRequest("userCredential", "user-credential"));

        UserDetailModel ud = new UserDetailModel();

        var ss = notifications.Rows.Where(r => r.Value.password == user.password && r.Value.userid == user.userid);

        List<UserDetailModel> un = notifications.Rows.Select(r => r.Value).ToList();

        foreach (var item in un)
        {
          if (item.userid != null && item.userid == user.userid && item.password == user.password)
          {
            valid = true;
            return valid;

          };
        }


      }

      return valid;
    }

    internal void ValidateUser()
    {
      throw new NotImplementedException();
    }

    public async Task<ActionResult> PostMethod1([FromBody]UserDetailModel user)
    {
      Boolean valid = true;
      //List<UserDetailModel> userdetails = await Get();
      // validating the user cred
      valid = await ValidateUser(user);
      return Json(valid);
    }
  }
}