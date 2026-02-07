import React, { useState, useEffect, useCallback } from 'react';
import tinyColor from 'tinycolor2';
import CustomColorPicker from './color/CustomColorPicker';
import { generateRandomString } from '../helpers/randomHelper';
import { basicThemes, advanceThemes } from '../data/themes';
import useNotification from '../hooks/useNotification';
import { useThemeStore } from '../store/ThemeStore';

const ColorThemeEditor = () => {
  const notify = useNotification();
  const { themes, buttons, notifications, setColorTheme, setButtonTheme, setNotificationTheme, setColorScheme } = useThemeStore();

  // Tabs
  const [tab, setTab] = useState(0);
  const Tabs = ['General', 'Buttons', 'Notification'];

  // UI state
  const [showPalette, setShowPalette] = useState(null); // 'Basic' | 'Advance' | null
  const [selectedGeneralTab, setSelectedGeneralTab] = useState('Control');
  const [mode] = useState('hexa');

  // Mock data — will be replaced by store on mount
  const [colours, setColours] = useState([
    { id: generateRandomString(), title: 'Primary', type: 'primary', color: '#000000', class: 'base' },
    { id: generateRandomString(), title: 'Secondary', type: 'secondary', color: '#464646', class: 'base' },
    { id: generateRandomString(), title: 'Background', type: 'background', color: '#ffffff', class: 'base' },
    { id: generateRandomString(), title: 'Container', type: 'container', color: '#ffffff', class: 'base' },
    { id: generateRandomString(), title: 'Highlight', type: 'highlight', color: '#b9b9b9', class: 'context' },
    { id: generateRandomString(), title: 'Icon', type: 'icon', color: '#100067', class: 'context' },
    { id: generateRandomString(), title: 'Label', type: 'label', color: '#818181', class: 'context' },
    { id: generateRandomString(), title: 'Text', type: 'text', color: '#333333', class: 'context' },
    { id: generateRandomString(), title: 'Link', type: 'link', color: '#3490dc', class: 'context' },
    { id: generateRandomString(), title: 'Border', type: 'border', color: '#949494', class: 'base' },
  ]);

  const [buttonsState, setButtonsState] = useState([
    { id: generateRandomString(), title: 'Primary Button', type: 'primary', background: '#01C311', color: '#ffffff', hoverbackground: '#6bff36', hovercolor: '#ffffff', hover: false },
    { id: generateRandomString(), title: 'Secondary Button', type: 'secondary', background: '#FF3B30', color: '#ffffff', hoverbackground: '#ff6f61', hovercolor: '#ffffff', hover: false },
    { id: generateRandomString(), title: 'Tertiary Button', type: 'tertiary', background: '#ffffff', color: '#404040', hoverbackground: '#e0e0e0', hovercolor: '#404040', hover: false },
    { id: generateRandomString(), title: 'Selected Button', type: 'selected', background: '#007BFF', color: '#ffffff', hoverbackground: '#0056b3', hovercolor: '#ffffff', hover: false },
    { id: generateRandomString(), title: 'Unselected Button', type: 'unselected', background: '#F4F4F4', color: '#B0B0B0', hoverbackground: '#D9D9D9', hovercolor: '#B0B0B0', hover: false },
    { id: generateRandomString(), title: 'Shop Button', type: 'shop', background: '#FF5733', color: '#ffffff', hoverbackground: '#ff7f47', hovercolor: '#ffffff', hover: false },
  ]);

  const [notificationsState, setNotificationsState] = useState([
    { id: generateRandomString(), title: 'Error Notification', type: 'error', color: '#F70000', text: '#ffffff', class: 'notification' },
    { id: generateRandomString(), title: 'Warn Notification', type: 'warn', color: '#FF9E00', text: '#ffffff', class: 'notification' },
    { id: generateRandomString(), title: 'Info Notification', type: 'info', color: '#0b81ff', text: '#ffffff', class: 'notification' },
    { id: generateRandomString(), title: 'Success Notification', type: 'success', color: '#00B50F', text: '#ffffff', class: 'notification' },
  ]);

  const randomControls = Array.from({ length: 6 }, (_, i) => ({
    title: `Panel Number ${i + 1}`,
    shortDescription: `This is a short description for panel ${i + 1}.`,
    fullDescription: `This is the full description for panel ${i + 1}. It provides an in-depth look into the subject matter.`,
  }));

  const randomContents = Array.from({ length: 3 }, (_, i) => ({
    title: `Content Number ${i + 1}`,
    shortDescription: `This is a short description for content ${i + 1}.`,
    fullDescription: `This is the full description for content ${i + 1}. It contains more details...`,
  }));

  // Load from store on mount
  useEffect(() => {
    if (themes) setColours(JSON.parse(themes));
    if (buttons) setButtonsState(JSON.parse(buttons));
    if (notifications) setNotificationsState(JSON.parse(notifications));
  }, [themes, buttons, notifications]);

  // Get preview color helper
  const getPreviewColor = useCallback((type, fallback = 'white') => {
    const found = colours.find(x => x.type === type);
    return found ? found.color : fallback;
  }, [colours]);

  // Generate dynamic styles
  const getPreviewStyle = useCallback((types) => {
    const typesArray = Array.isArray(types) ? types : [types];
    const style = {};

    typesArray.forEach(type => {
      switch (type) {
        case 'gradient':
          style.backgroundImage = `linear-gradient(to right, ${getPreviewColor('primary')}, ${getPreviewColor('secondary')})`;
          break;
        case 'background':
          style.background = getPreviewColor('background', 'black');
          break;
        case 'container':
          style.background = getPreviewColor('container', 'black');
          break;
        case 'highlight':
          style.color = getPreviewColor('highlight', 'black');
          break;
        case 'icon':
          style.color = getPreviewColor('icon', 'black');
          break;
        case 'label':
          style.color = getPreviewColor('label', 'black');
          break;
        case 'text':
          style.color = getPreviewColor('text', 'black');
          break;
        case 'link':
          style.color = getPreviewColor('link', 'black');
          break;
        case 'border':
          style.borderColor = getPreviewColor('border', 'black');
          break;
        default:
          break;
      }
    });

    return style;
  }, [getPreviewColor]);

  // Apply basic theme
  const setBasicColorTheme = useCallback((theme) => {
    const primary = tinyColor(theme[0] ?? '#000000');
    const secondary = tinyColor(theme[1] ?? '#464646');
    const accent = tinyColor(theme[2] ?? '#b9b9b9');

    setColours(prev =>
      prev.map(x => {
        let colorData = x.color;
        switch (x.type) {
          case 'primary': colorData = primary.toHexString(); break;
          case 'secondary': colorData = secondary.toHexString(); break;
          case 'background':
          case 'container': colorData = '#ffffff'; break;
          case 'highlight': colorData = accent.toHexString(); break;
          case 'icon': colorData = accent.darken(15).toHexString(); break;
          case 'label': colorData = primary.lighten(40).desaturate(20).toHexString(); break;
          case 'text': colorData = primary.isDark() ? primary.lighten(40).toHexString() : primary.darken(30).toHexString(); break;
          case 'link': colorData = accent.toHexString(); break;
          case 'border': colorData = secondary.desaturate(20).lighten(20).toHexString(); break;
          default: break;
        }
        return { ...x, color: colorData };
      })
    );
  }, []);

  // Apply advanced theme
  const setAdvanceColorTheme = useCallback((theme) => {
    setColours(prev =>
      prev.map(x => ({ ...x, color: theme[x.type] || x.color }))
    );
  }, []);

  // Save handler
  const save = useCallback(() => {
    notify('Changes have been applied.', 'success');
    
    // Commit to store
    setColorTheme(JSON.stringify(colours));
    setButtonTheme(JSON.stringify(buttonsState));
    setNotificationTheme(JSON.stringify(notificationsState));

    const scheme = tinyColor(getPreviewColor('container'));
    setColorScheme(scheme.isDark());
  }, [colours, buttonsState, notificationsState, getPreviewColor, notify, setColorTheme, setButtonTheme, setNotificationTheme, setColorScheme]);

  // Button hover handlers
  const handleButtonMouseOver = (id) => {
    setButtonsState(prev =>
      prev.map(btn => (btn.id === id ? { ...btn, hover: true } : btn))
    );
  };

  const handleButtonMouseLeave = (id) => {
    setButtonsState(prev =>
      prev.map(btn => (btn.id === id ? { ...btn, hover: false } : btn))
    );
  };

  // Color change handlers
  const updateColour = (id, newColor) => {
    setColours(prev => prev.map(c => (c.id === id ? { ...c, color: newColor } : c)));
  };

  const updateButtonProp = (id, prop, value) => {
    setButtonsState(prev => prev.map(b => (b.id === id ? { ...b, [prop]: value } : b)));
  };

  const updateNotificationProp = (id, prop, value) => {
    setNotificationsState(prev => prev.map(n => (n.id === id ? { ...n, [prop]: value } : n)));
  };

  return (
    <div>
      <section className="mx-auto max-w-screen-xl">
        {/* General Colours */}
        <article className="px-4 pt-4 text-2xl font-black md:text-2xl lg:text-4xl">
          <span className="from-general-primary to-general-secondary bg-gradient-to-r bg-clip-text text-transparent  w-full text-left">
            General Colours
          </span>
          <hr className="border-general-border mt-2 rounded border-2" />
        </article>

        <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
          {/* Preview Field */}
          <section
            className="flex-1 rounded-md drop-shadow-lg"
            style={getPreviewStyle(['background'])}
          >
            <section
              className="from-general-primary to-general-secondary relative rounded-t-md bg-gradient-to-r py-8 md:py-12"
              style={getPreviewStyle(['gradient'])}
            >
              <div className="col-span-12 space-y-2 px-4 text-center sm:space-y-3 sm:text-left md:mt-6 lg:col-span-6 xl:mt-8">
                <h1 className="flex flex-row text-2xl font-bold text-white lg:text-3xl">Template Preview</h1>
                {selectedGeneralTab !== 'Control' && (
                  <button
                    type="button"
                    className="absolute right-2 bottom-2 w-24 rounded border border-white px-2 py-1 text-center text-xs font-medium text-white"
                    onClick={() => setSelectedGeneralTab('Control')}
                  >
                    <i className="ri-refresh-line"></i> Controls
                  </button>
                )}
                {selectedGeneralTab !== 'Content' && (
                  <button
                    type="button"
                    className="absolute right-2 bottom-2 w-24 rounded border border-white px-2 py-1 text-center text-xs font-medium text-white"
                    onClick={() => setSelectedGeneralTab('Content')}
                  >
                    <i className="ri-refresh-line"></i> Contents
                  </button>
                )}
              </div>
            </section>

            <section className="flex w-full flex-col gap-6 p-2 md:py-4">
              {selectedGeneralTab === 'Control' && (
                <div className="mb-5 grid gap-6 text-center md:grid-cols-2 lg:grid-cols-3">
                  {randomControls.map(panel => (
                    <article
                      key={panel.title}
                      className="bg-general-background rounded border drop-shadow-lg"
                      style={getPreviewStyle(['border', 'container'])}
                    >
                      <div className="py-4">
                        <i className="ri-settings-5-fill text-5xl" style={getPreviewStyle(['icon'])}></i>
                        <h2 className="text-lg font-semibold" style={getPreviewStyle(['highlight'])}>
                          {panel.title}
                        </h2>
                        <hr className="my-4" style={getPreviewStyle(['border'])} />
                        <span style={getPreviewStyle(['link'])}>Manage</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {selectedGeneralTab === 'Content' && (
                <div className="mb-5 grid gap-6 text-center">
                  {randomContents.map(content => (
                    <article
                      key={content.title}
                      className="flex flex-wrap items-center overflow-hidden rounded border drop-shadow-lg"
                      style={getPreviewStyle(['border', 'container'])}
                    >
                      <img
                        src="/assets/images/products/brand_item_placeholder_thumbnail.png"
                        alt="Placeholder"
                        className="relative aspect-square h-max flex-none border-4 object-cover drop-shadow-lg md:max-h-40"
                        style={getPreviewStyle(['border', 'container'])}
                      />
                      <div className="flex-1 p-2">
                        <h2 className="text-left text-base font-semibold" style={getPreviewStyle(['highlight'])}>
                          {content.title}
                        </h2>
                        <p className="text-left text-sm font-semibold" style={getPreviewStyle(['label'])}>
                          Description:
                        </p>
                        <p className="line-clamp-2 text-left indent-4 text-xs" style={getPreviewStyle(['text'])}>
                          {content.fullDescription}
                        </p>
                        <hr className="my-3" style={getPreviewStyle(['border'])} />
                        <span className="w-full text-left text-sm" style={getPreviewStyle(['link'])}>
                          View Full Details
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </section>

          {/* Color Selection Bar */}
          <article className="w-full max-w-[350px]">
            <div className="relative mb-2 text-left">
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`flex-1 rounded border-2 border-white px-3 py-2 font-semibold ${
                    showPalette === 'Basic' ? 'bg-white text-black' : 'text-white'
                  }`}
                  onClick={() => setShowPalette(prev => (prev === 'Basic' ? null : 'Basic'))}
                  onBlur={() => setShowPalette(null)}
                >
                  <i className="ri-color-filter-line"></i> Basic
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded border-2 border-white px-3 py-2 font-semibold ${
                    showPalette === 'Advance' ? 'bg-white text-black' : 'text-white'
                  }`}
                  onClick={() => setShowPalette(prev => (prev === 'Advance' ? null : 'Advance'))}
                  onBlur={() => setShowPalette(null)}
                >
                  <i className="ri-color-filter-ai-line"></i> Advanced
                </button>
              </div>

              {/* Basic Palette */}
              {showPalette === 'Basic' && (
                <div className="ring/5 absolute top-full left-0 z-30 mt-2 max-h-80 w-full divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black drop-shadow-lg block">
                  <div className="w-full py-1">
                    {basicThemes.map(theme => (
                      <div
                        key={theme.title}
                        className="flex items-start justify-start gap-2 p-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 cursor-pointer"
                        onMouseDown={() => setBasicColorTheme(theme)}
                      >
                        {theme.slice(0, 3).map((color, idx) => (
                          <span
                            key={idx}
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advanced Palette */}
              {showPalette === 'Advance' && (
                <div className="ring/5 absolute top-full left-0 z-30 mt-2 max-h-80 w-full divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black drop-shadow-lg block">
                  <div className="w-full py-1">
                    {advanceThemes.map(theme => (
                      <div
                        key={theme.title}
                        className="flex flex-col items-start justify-start gap-2 p-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 cursor-pointer"
                        onMouseDown={() => setAdvanceColorTheme(theme)}
                      >
                        <span>{theme.title}</span>
                        <div className="flex gap-1">
                          {Object.values(theme).slice(1).map((color, idx) => (
                            <span
                              key={idx}
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="from-general-primary to-general-secondary rounded-t-md bg-gradient-to-r p-2 font-black text-white">
              Color Scheme
            </div>

            {colours.map(colour => (
              <details key={colour.id} className="w-full border-none bg-transparent p-0">
                <summary className="border-general-border bg-general-background flex items-center justify-start gap-2 border p-2 font-semibold drop-shadow-lg">
                  <div
                    className="border-general-border h-6 w-6 rounded-full border"
                    style={{ backgroundColor: colour.color }}
                  />
                  <span className="text-general-text">{colour.title}</span>
                </summary>
                <div className="flex items-center justify-center p-2">
                  <CustomColorPicker
                    value={colour.color}
                    onChange={(newColor) => updateColour(colour.id, newColor)}
                    mode={mode}
                    className="custom-color-picker mb-1 w-full"
                  />
                </div>
              </details>
            ))}
          </article>
        </div>

        {/* Button Colours */}
        <article className="px-4 pt-4 text-2xl font-black md:text-2xl lg:text-4xl">
          <span className="from-general-primary to-general-secondary bg-gradient-to-r bg-clip-text text-transparent  w-full text-left">
            Button Colours
          </span>
          <hr className="border-general-border mt-2 rounded border-2" />
        </article>

        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
          {buttonsState.map(button => (
            <section
              key={button.id}
              className="bg-general-container border-general-border flex flex-col gap-2 rounded-md border p-4 drop-shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <span
                    className="w-full rounded py-2 text-center font-bold drop-shadow-lg transition duration-300"
                    style={{
                      backgroundColor: button.hover ? button.hoverbackground : button.background,
                      color: button.hover ? button.hovercolor : button.color,
                    }}
                    onMouseOver={() => handleButtonMouseOver(button.id)}
                    onMouseLeave={() => handleButtonMouseLeave(button.id)}
                  >
                    {button.title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  <div>
                    <label className="text-sm font-semibold">Background Color:</label>
                    <CustomColorPicker
                      value={button.background}
                      onChange={(c) => updateButtonProp(button.id, 'background', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Hover BG Color:</label>
                    <CustomColorPicker
                      value={button.hoverbackground}
                      onChange={(c) => updateButtonProp(button.id, 'hoverbackground', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Text Color:</label>
                    <CustomColorPicker
                      value={button.color}
                      onChange={(c) => updateButtonProp(button.id, 'color', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Hover Text Color:</label>
                    <CustomColorPicker
                      value={button.hovercolor}
                      onChange={(c) => updateButtonProp(button.id, 'hovercolor', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Notification Colours */}
        <article className="px-4 pt-4 text-2xl font-black md:text-2xl lg:text-4xl">
          <span className="from-general-primary to-general-secondary bg-gradient-to-r bg-clip-text text-transparent  w-full text-left">
            Notification Colours
          </span>
          <hr className="border-general-border mt-2 rounded border-2" />
        </article>

        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2">
          {notificationsState.map(notification => (
            <section
              key={notification.id}
              className="bg-general-container border-general-border flex flex-col gap-2 rounded-md border p-4 drop-shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <span
                    className="w-full rounded py-6 text-center text-lg drop-shadow-lg"
                    style={{ backgroundColor: notification.color, color: notification.text }}
                  >
                    {notification.title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  <div>
                    <label className="text-sm font-semibold">Background Color:</label>
                    <CustomColorPicker
                      value={notification.color}
                      onChange={(c) => updateNotificationProp(notification.id, 'color', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Text Color:</label>
                    <CustomColorPicker
                      value={notification.text}
                      onChange={(c) => updateNotificationProp(notification.id, 'text', c)}
                      className="aspect-square h-6 w-full appearance-none rounded border-none leading-tight text-gray-700 shadow focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="flex p-4">
          <button
            className="primary-button flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={save}
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
};

export default ColorThemeEditor;