using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyCouch;
using bimmac22.Models;
using MyCouch.Requests;
using bimmac22.Controllers;
using bimmac22.Connenction;
using MyCouch.Responses;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace bimmac22
{

	public class ValuesController : Controller
	{

		LoginController _lg;
		ConnectionStrings db;

		// routed to get list of sites
		[Route("api/Values/GetSites")]
		[HttpPost]
		public async Task<ActionResult> GetSites([FromBody]string role)//
		{
			db = new ConnectionStrings();
			var uriBuilder = db.GetCouchUrl();

			List<SiteModel> sites = new List<SiteModel>();
			List<SiteModel> siteslist = new List<SiteModel>();

			using (var client = new MyCouchClient(uriBuilder))
			{
				var notifications = await client.Views.QueryAsync<SiteModel>(new QueryViewRequest("siteList", "site-list"));
				sites = notifications.Rows.Select(r => r.Value).ToList();
				foreach (var item in sites)
				{
					//Add a check based on the role once confirmed from the user
					if (item.sitename != null)
					{
						siteslist.Add(item);
					};
				}
			}
			return Json(siteslist);
		}

		//To validate the user
		[Route("api/Values/ValidateUser")]
		[HttpPost]
		public async Task<Boolean> ValidateUser([FromBody]UserDetailModel user)
		{
			db = new ConnectionStrings();
			var uriBuilder = db.GetCouchUrl();

			Boolean valididation = false;
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
						valididation = true;
						return valididation;

					};
				}
			}

			return valididation;
		}

		//To get the list of elements
		[Route("api/Values/GetElements")]
		[HttpPost]
		public async Task<ActionResult> GetElements([FromBody]string siteid)
		{
			db = new ConnectionStrings();
			var uriBuilder = db.GetCouchUrl();
			List<ElementModel> elements = new List<ElementModel>();
			elements.Clear();
			using (var client = new MyCouchClient(uriBuilder))
			{

				//Configuring the view that has to be queried
				var query = new QueryViewRequest("elementList", "element-list").Configure(query1 => query1
			//.Limit(5)
			.Key(siteid)
			//.Keys("1","111")
			.Reduce(false));


				//var result3 = await client.Views.QueryAsync<ElementModel>(query);

				var notifications = await client.Views.QueryAsync<ElementModel>(query);
				elements = notifications.Rows.Select(r => r.Value).ToList();

			}
			return Json(elements);
		}

		public class Elementid
		{
			public string elementid { get; set; }
		}

		// To get the properties of a single element
		[Route("api/Values/GetElement")]
		[HttpPost]
		public async Task<ActionResult> GetElement([FromBody]Elementid elementid)
		{
			/*
			 * request.Configure(q => q
		  .Stale(bool value)
		  .IncludeDocs(bool value)
		  .Descending(bool value)
		  .Key(string value)
		  .Keys(params string[] value)
		  .StartKey(string value)
		  .StartKeyDocId(string value)
		  .EndKey(string value)
		  .EndKeyDocId(string value)
		  .InclusiveEnd(bool value)
		  .Skip(int value)
		  .Limit(int value)
		  .Reduce(bool value)
		  .UpdateSeq(bool value)
		  .Group(bool value)
		  .GroupLevel(int value));
			 */
			db = new ConnectionStrings();
			var uriBuilder = db.GetCouchUrl();
			List<ElementModel> element = new List<ElementModel>();
			element.Clear();
			using (var client = new MyCouchClient(uriBuilder))
			{
				//Configuring the view that has to be queried
				var query = new QueryViewRequest("qrElement", "qrElement-view").Configure(query1 => query1
			//.Limit(5)
			//.Key(qrid)
			.Key(elementid.elementid)
			.Reduce(false));


				//var result3 = await client.Views.QueryAsync<ElementModel>(query);

				var notifications = await client.Views.QueryAsync<ElementModel>(query);
				element = notifications.Rows.Select(r => r.Value).ToList();

			}
			return Json(element);
		}


		[Route("api/Values/SetElementStatus")]
		[HttpPost]
		public async Task<ActionResult> SetElementStatus([FromBody] ElementModel revelement)
		{

			db = new ConnectionStrings();
			var uriBuilder = db.GetCouchUrl();
			List<ElementModel> element = new List<ElementModel>();
			DateTime currentTimestamp = DateTime.Now;
			using (var client = new MyCouchClient(uriBuilder))
			{

				// updating the revised element status
				var notifications = await client.Entities.PutAsync(revelement);

				//Configuring the view that has to be queried
				//var query = new QueryViewRequest("elementList", "element-list").Configure(query1 => query1
				//.Limit(5)
				//.Key(elementId)
				//.Keys("1","111")
				//.Reduce(false));


				//var notifications = await client.Views.QueryAsync<ElementModel>(query);
				//element = notifications.Rows.Select(r => r.Value).ToList();

			}
			return Json(element);

		}

	}
}
