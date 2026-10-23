/*
 * Fills in the state when a record does not carry one, using the city.
 * Add a city here if a college shows up under "Other states".
 * Cities that exist in more than one state are left out on purpose; set `state` on the record instead.
 */
const STATES = {
  Maharashtra: ['Sangli', 'Kolhapur', 'Wardha', 'Aurangabad', 'Navi Mumbai', 'Chhatrapati Sambhajinagar', 'Loni', 'Karad', 'Pimpri', 'Pune', 'Nagpur', 'Mumbai', 'Nashik', 'Dhule', 'Thane', 'Latur', 'Solapur', 'Amravati', 'Akola'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Sehore', 'Dewas', 'Sagar', 'Gwalior', 'Rewa', 'Ujjain'],
  Karnataka: ['Bangalore', 'Bengaluru', 'Manipal', 'Mysore', 'Mysuru', 'Kolar', 'Tumkur', 'Bijapur', 'Vijayapura', 'Hubli', 'Bellary', 'Raichur', 'Gulbarga', 'Kalaburagi', 'Bidar', 'Chitradurga', 'Shimoga', 'Shivamogga', 'Dharwad', 'Mangalore', 'Mangaluru', 'Udupi', 'Hassan', 'Mandya', 'Belgaum', 'Belagavi', 'Davangere', 'Bellur', 'Sullia', 'Bagalkot'],
  Punjab: ['Bathinda', 'Pathankot', 'Ludhiana', 'Banur', 'Jalandhar', 'Mandi Gobindgarh', 'Amritsar', 'Patiala', 'Faridkot', 'Mohali'],
  Bihar: ['Saharsa', 'Kishanganj', 'Muzaffarpur', 'Sasaram', 'Madhubani', 'Gaya', 'Madhepura', 'Patna', 'Katihar', 'Khagaria', 'East Champaran', 'Pavapuri', 'Bhagalpur', 'Darbhanga', 'Nalanda'],
  Uttarakhand: ['Dehradun', 'Haldwani', 'Rishikesh', 'Srinagar'],
  'West Bengal': ['Durgapur', 'Haldia', 'Kolkata', 'Murshidabad', 'Howrah', 'Nadia', 'Krishnanagar', 'Hooghly', 'Raniganj', 'Bolpur', 'Siliguri', 'Burdwan'],
  'Tamil Nadu': ['Chennai', 'Vellore', 'Chidambaram', 'Coimbatore', 'Madurai', 'Thanjavur', 'Kanchipuram', 'Kelambakkam', 'Salem', 'Tirunelveli', 'Trichy', 'Tiruchirappalli'],
  'Andhra Pradesh': ['Tirupati', 'Eluru', 'Andhra Pradesh', 'Chittoor', 'Kadapa', 'Visakhapatnam', 'Srikakulam', 'Rajahmundry', 'Guntur', 'Amalapuram', 'Vizianagaram', 'Nellore', 'Vijayawada', 'Kuppam', 'Nandyal', 'Kurnool', 'Ongole', 'Anantapur'],
  Puducherry: ['Puducherry', 'Pondicherry'],
  Gujarat: ['Palanpur', 'Surendranagar', 'Bharuch', 'Ahmedabad', 'Vadodara', 'Dahod', 'Surat', 'Karamsad', 'Rajkot', 'Jamnagar', 'Bhavnagar', 'Gandhinagar'],
  Rajasthan: ['Jaipur', 'Ajmer', 'Udaipur', 'Rajsamand', 'Sri Ganganagar', 'Jodhpur', 'Kota', 'Bikaner', 'Alwar'],
  Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur'],
  Odisha: ['Bhubaneswar', 'Sambalpur', 'Cuttack', 'Berhampur'],
  Telangana: ['Hyderabad', 'Karimnagar', 'Chevella', 'Nalgonda', 'Vikarabad', 'Khammam', 'Sangareddy', 'Warangal', 'Nizamabad'],
  Kerala: ['Thodupuzha', 'Thrissur', 'Kochi', 'Kollam', 'Thiruvalla', 'Wayanad', 'Thiruvananthapuram', 'Kannur', 'Palakkad', 'Kozhikode', 'Kothamangalam', 'Perinthalmanna', 'Adoor', 'Alappuzha', 'Kottayam'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Kanpur', 'Prayagraj', 'Allahabad', 'Greater Noida', 'Noida', 'Bareilly', 'Meerut', 'Barabanki', 'Ghaziabad', 'Agra', 'Aligarh', 'Gorakhpur', 'Moradabad', 'Jhansi'],
  Haryana: ['Rohtak', 'Mullana', 'Ambala', 'Gurugram', 'Gurgaon', 'Jhajjar', 'Faridabad', 'Hisar', 'Sonipat'],
  Delhi: ['New Delhi', 'Delhi'],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad'],
  Assam: ['Guwahati', 'Dibrugarh', 'Silchar'],
  'Jammu & Kashmir': ['Srinagar', 'Jammu'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan'],
};

const KNOWN_STATES = Object.keys(STATES);
const LOOKUP = new Map();
Object.entries(STATES).forEach(([state, cities]) => cities.forEach((c) => LOOKUP.set(c.toLowerCase(), state)));

/** "Vijayapura, Karnataka" / "Udaipur (Umarda)" / "Pimpri, Pune" all resolve; returns null if unknown. */
export function resolveState(city) {
  if (!city) return null;
  const parts = String(city).split(/[,(/)]/).map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const stateName = KNOWN_STATES.find((s) => s.toLowerCase() === part.toLowerCase());
    if (stateName) return stateName;
  }
  for (const part of parts) {
    const hit = LOOKUP.get(part.toLowerCase());
    if (hit) return hit;
  }
  return null;
}
