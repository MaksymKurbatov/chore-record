Перепиши нижнее меню на `createBottomTabNavigator` из `@react-navigation/bottom-tabs`
вместо текущего кастомного `Stack.Navigator` + `useNavigationContainerRef` +
`addListener('state')` в `app-record/front/app/navigation/Navigation.tsx`.

Контекст: сейчас `Navigation.tsx` держит `NavigationContainer` со
`Stack.Navigator`, вручную создаёт `navRef` через
`useNavigationContainerRef<TypeRootStackParamsList>()`, подписывается на
событие `'state'`, чтобы знать активный экран, и передаёт этот route +
колбэк навигации в кастомный `BottomMenu` (`app/ui/layout/bottomMenu/`).
Это нестандартная схема — react-navigation даёт для кастомного таб-бара
готовый паттерн через проп `tabBar` у `createBottomTabNavigator`, который
сам передаёт `state`, `descriptors`, `navigation`, `insets` в компонент.

Что нужно сделать:
1. Установить `@react-navigation/bottom-tabs` через `npx expo install
   @react-navigation/bottom-tabs` (важно ставить именно так, а не через
   npm — expo install подбирает версию под текущий Expo SDK).
2. В `Navigation.tsx` заменить `createNativeStackNavigator` на
   `createBottomTabNavigator<TypeRootStackParamsList>()`, убрать
   `navRef`/`useEffect`/`addListener`/`currentRoute` — они больше не
   нужны, таб-навигатор сам знает активный экран. Экраны брать из
   `routes.ts` (`app/navigation/routes.ts`), как и раньше.
3. Прокинуть кастомный таб-бар через `tabBar={props => <BottomMenu
   {...props} />}`.
4. Переписать `app/ui/layout/bottomMenu/bottomMenu.tsx` на приём
   `BottomTabBarProps` (`state`, `navigation`, `insets`) вместо
   самодельных пропсов `nav`/`currentRoute`. Иконки на каждый route брать
   из `menu.data.ts` (список `{ icon, path }`) по совпадению
   `route.name === item.path`. Нажатие обрабатывать через официальный
   паттерн: `navigation.emit({ type: 'tabPress', target: route.key,
   canPreventDefault: true })`, и если не `event.defaultPrevented` и
   вкладка не активна — `navigation.navigate(route.name, route.params)`.
   `insets.bottom` брать из пропсов таб-бара вместо отдельного
   `useSafeAreaInsets()`.
5. Переписать `app/ui/layout/bottomMenu/MenuItem.tsx` на приём
   `isActive`/`onPress` вместо `nav`/`currentRoute` — отображение иконки
   (сейчас `IconButton` из react-native-paper с `Feather`-иконкой через
   render-функцию) не менять, просто подключить к новым пропсам.
6. Убрать тип `TypeNavigate` из `menu.interface.ts` — он был нужен только
   для старой самодельной схемы, `createBottomTabNavigator` даёт
   `navigation` напрямую.
7. Не трогать `PrivateNavigation.tsx` — это отдельный неиспользуемый
   сейчас файл, авторизационный гейтинг в эту задачу не входит.
8. После правок прогнать `npx tsc --noEmit -p . --ignoreDeprecations
   6.0` и `npx eslint .` из `app-record/front/` — не должно быть новых
   ошибок.

Из прошлой попытки: `PaperProvider`/`useTheme<AppTheme>()` уже
использовались в `MenuItem`/`BottomMenu` для цвета активной иконки и фона
меню (`colors.primary`, `colors.onSurfaceVariant`, `colors.surface`,
`colors.outlineVariant`) — если к моменту переноса эта тема-интеграция
уже в коде, встраивай новую логику таб-бара в неё, а не затирай.
