# Restaurant Menu Ordering Application

A modern, full-stack web application designed for seamless digital menu browsing and ordering in restaurants. Customers can check into their table session, view menus, place orders, and track order status in real time. The app also features a Kitchen Dashboard for staff to process and manage active orders.

---

## Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: CSS
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Notifications**: SweetAlert2 & React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB

---

## Application Workflow

1. **Table Check-in**: Customers check in using their table number to initialize a digital dining session.
2. **Browse & Select**: Customers browse menu categories (Food, Drinks, Desserts), view item descriptions, and add items to their ordering cart.
3. **Place Order**: Confirming the order registers items under the table session, database-logged with a Pending status.
4. **Kitchen Dashboard**: Kitchen staff logs in, sees active orders, accepts them (updating status to Preparing), and marks them as Ready once cooked.
5. **Real-time Tracking**: Customers track preparation progress live on their device.

---

## Key Features
- **Table Session Setup**: Secure check-in by table number to start an ordering session.
- **Dynamic Menu & Filtering**: Browse food, drinks, and desserts with responsive category filters.
- **Item Details**: View descriptive pages for each dish with pricing and availability.
- **Order Placement & Tracking**: Place orders, calculate bills, and track preparation status in real-time.
- **Kitchen Staff Dashboard**: Specialized login and dashboard for cooks to receive, update, and complete incoming orders.
