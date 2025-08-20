# KickPlate Pergola Ceiling Panel Configurator

## Overview
KickPlate is a web-based configurator for designing and ordering custom pergola ceiling panels. This application streamlines the process of calculating, visualizing, and ordering kickplate panels based on user specifications.

## 🚀 Features

### Interactive Panel Configuration
- **Model Selection**: Choose between different panel styles and configurations
- **Dynamic Measurements**: Input and convert measurements in mm, cm, or meters
- **Real-time Visualization**: Live preview of panel layout and dimensions
- **Auto-calculations**: Automatic calculation of required pieces and materials
- **Multi-set Support**: Add multiple panel sets to a single order

### User Interface
- **Step-by-step Workflow**: Guided 8-step process for panel configuration
- **Responsive Design**: Mobile-friendly interface with optimized layouts
- **Interactive Previews**: Animated panel visualizations with dimension indicators
- **Material Requirements**: Automatic calculation of cut lengths, trim pieces, and supports
- **Error Prevention**: Built-in validation to ensure accurate measurements

### Technical Features
- **Unit Conversion**: Seamless conversion between mm, cm, and meters
- **State Management**: Persistent data storage across sessions
- **Responsive Grid System**: Adapts to various screen sizes
- **Modern Animations**: Smooth transitions and interactive elements

## 🛠️ Technology Stack


### Frontend
- **Framework**: React 19
- **Routing**: React Router 7
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Build Tool**: Vite 7

### Development Tools
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint
- **Styling**: PostCSS & Tailwind
- **Type Checking**: TypeScript-ready configuration

## 📋 Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Modern web browser with JavaScript enabled

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/INZAMAMULHAQUE-0/kickPlate.git
cd kickPlate
```

2. Install dependencies
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install
# or
yarn install
```

3. Start development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory with the following variables:
```env
VITE_API_URL=your_api_url_here
```

### Build Configuration
- **Development**: `npm run dev` or `yarn dev`
- **Production Build**: `npm run build` or `yarn build`
- **Preview Production**: `npm run preview` or `yarn preview`

## 📱 Usage Guide

### Step-by-Step Configuration Process

1. **Model Selection**
   - Choose your preferred panel model
   - Review model specifications

2. **Cut Length**
   - Enter panel cut length
   - Choose measurement unit (mm/cm/m)
   - View real-time preview

3. **Pergola Length**
   - Specify total pergola length
   - Automatic calculation of required panels

4. **Final Sizes**
   - Review and adjust measurements
   - Verify calculated pieces
   - Customize support structure

5. **Preview**
   - View complete panel layout
   - Verify all measurements
   - Add additional sets if needed

6. **Color Selection**
   - Choose panel colors
   - Preview final appearance

7. **Bill Preview**
   - Review material requirements
   - Check cost breakdown
   - Verify order details

8. **Delivery Details**
   - Enter shipping information
   - Complete order process

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **INZAMAMULHAQUE-0** - *Initial work*

## 🙏 Acknowledgments
- Dubai Factory TechnoMec for project specifications