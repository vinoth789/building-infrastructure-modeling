using System;
using System.Collections.Generic;
using System.Linq;

namespace bimmac22.Models
{
    public class ElementModel
    {
		public string _id { get; set; }
		public string _rev { get; set; }
        public string siteid { get; set; }
        public string elementid { get; set; }
        public string elementname { get; set; }
        public string category { get; set; }
        public string timestamp { get; set; }
        public string status { get; set; }
		public string property { get; set; }
		public string cost { get; set; }
        //public Status elementstatus { get; set; }
        public ElementStatus elementstatus { get; set; }
    }

  public class ElementStatus
  {
    public string notstarted { get; set; }
    public string inprogress { get; set; }
    public string completed { get; set; }
  }
}