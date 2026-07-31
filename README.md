Vidya Computer Institute — Website (v2: Firebase-driven + Admin Panel)
Naya kya hai
Courses ab config.js mein hardcoded nahi — Firebase Database se load hote hain
admin.html — login karke courses add/edit/delete karo, enquiries dekho
course.html — har course ka apna detail page
Scroll animations add hui hain
Files
index.html, course.html, admin.html — pages
style.css — design + animations
config.js — sirf site settings (naam, phone, branches) — courses NAHI
firebase-config.js — Firebase project keys (already set hai)
script.js — homepage ka logic (Firebase se courses fetch karta hai)
Zaroori Setup Steps
1. Firebase Authentication enable karo (admin login ke liye)
Firebase Console → kuldeep-study project → Build → Authentication
Get Started → Sign-in method tab → Email/Password → Enable karo
Users tab → Add user → apna admin email + password daalo (ye admin.html mein login karne ke liye use hoga)
2. Database Rules update karo
Realtime Database → Rules tab mein ye set karo:
Json
Isse: koi bhi student enquiry submit kar sakta hai aur courses dekh sakta hai, lekin sirf logged-in admin hi courses edit kar sakta hai ya enquiries padh sakta hai.
3. Files GitHub pe upload/replace karo
Ye files replace karni hain (same naam se):
index.html, script.js, style.css, config.js
Ye nayi files add karni hain:
admin.html, course.html
⚠️ Upload karte waqt file names exact rakhna (.html, .js extensions ke saath) — pehle jaisi galti (naam badal jaana) na ho.
4. Pehle courses add karo
Deploy hone ke baad yourdomain.vercel.app/admin.html pe jao
Admin email/password se login karo
"Naya Course Add Karo" form se apne saare courses add karo (jitna chaho utna)
Kaise use karein
Students: index.html pe courses dikhenge, tap karke course.html pe detail khulega
Owner: admin.html pe login karke courses manage karo aur enquiries dekho
Aage kya add kar sakte ho
Real photos/gallery section
Custom domain (.vercel.app ki jagah apna domain)
Google Reviews widget
Blog section
