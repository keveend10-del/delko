export const PIPELINE_STAGES = ['New Lead','Researched','Contacted','Interested','Audit Sent','Call Booked','Proposal Sent','Won','Lost','Nurture']
export const LEAD_SOURCES = ['Free audit form','Instagram DM','Email outreach','Referral','In-person','LinkedIn','Manual research','Existing relationship']
export const PRIORITIES = ['Low','Medium','High','Hot']
export const TASK_PRIORITIES = ['Low','Medium','High','Urgent']
export const TASK_STATUSES = ['To do','In progress','Waiting','Done']
export const AUDIT_STATUSES = ['New','Reviewed','Audit in progress','Audit sent','Call booked','Converted to lead','Archived']
export const CLIENT_STATUSES = ['Active','Paused','Completed','Past client','Retainer client']
export const PAYMENT_STATUSES = ['Not invoiced','Invoice sent','Deposit paid','Paid in full','Monthly retainer active','Overdue']
export const PROJECT_STATUSES = ['Not started','Intake needed','In progress','Waiting on client','Revision','Ready to launch','Launched','Completed']
export const SWAY_STATUSES = ['Possible fit','Mention later','Interested','Demo needed','Pilot candidate','Not a fit']
export const SWAY_USE_CASES = ['Check-ins','Event tracking','Loyalty','Repeat visits','Customer insights','Student traffic','Gym crowd tracking','Mug club / membership','VIP recognition']
export const CONTACT_METHODS = ['Email','Instagram DM','LinkedIn','Phone','In person','Website contact form']
export const RESPONSE_STATUSES = ['No response','Replied','Interested','Not interested','Follow up later','Booked call']
export const PACKAGES = ['Foundation','Growth','Dominate']
export const PACKAGE_OPTIONS = [
  { key: 'foundation', label: 'Foundation' },
  { key: 'growth', label: 'Growth' },
  { key: 'dominate', label: 'Dominate' },
]
export const BERKSHIRE_TOWNS = ['Adams','Becket','Cheshire','Dalton','Egremont','Great Barrington','Hinsdale','Lee','Lenox','Monterey','North Adams','Otis','Pittsfield','Richmond','Sheffield','Stockbridge','Tyringham','West Stockbridge','Williamstown']
export const NORTH_SHORE_TOWNS = ['Beverly','Danvers','Essex','Gloucester','Hamilton','Ipswich','Lynn','Manchester-by-the-Sea','Marblehead','Nahant','Newburyport','Peabody','Rockport','Salem','Swampscott','Topsfield','Wenham']
export const ALL_SERVICE_TOWNS = [...BERKSHIRE_TOWNS.sort(), ...NORTH_SHORE_TOWNS.sort()]
export const BUSINESS_TYPES = ['Painting','Contractor','Landscaping','Cleaning','Barbershop','Salon','Gym','Café','Restaurant','Bar','Real estate','Boutique / retail','Wellness / spa','Auto','Other']
