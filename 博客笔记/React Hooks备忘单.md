![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/mSwSlh2NWE9VdfjMF38UP8CUQB8GW4kIG6Znj9L6XchibGChD78FMevbhkveAja139K1TsC2oicqobEPEVjVAemg/640?wx_fmt=webp&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

为什么需要React Hooks备忘单？在React世界中，Hooks的引入受到了开发人员社区的欢迎。基本上，

> Hooks是一种函数，可以让你从函数组件中“钩入”React状态和生命周期特性。

它们是向后兼容的，不与类一起工作。如果你是一个新的钩的世界，甚至是一个经验丰富的专业人士，这个小抄将帮助你得到你所有的疑问和查询清楚。

## Basic level — React Hooks Cheat Sheet

### 1.为什么要引入Hooks，或者为什么我们需要它们？

React团队引入Hooks的原因如下：

1.在不改变组件层次结构的情况下重用有状态逻辑：使用Hooks，我们可以从组件中提取有状态逻辑，以便在需要时独立测试和重用。这使得在许多组件之间或与团队中的其他人共享Hooks变得很容易。

模式，如渲染道具和高阶组件（HOC），要求您重新构造组件。这可能很麻烦，并且使代码更难遵循。在引入Hooks之后，共享有状态逻辑变得更好了。

2.将一个组件拆分为更小的函数：Hooks还使编写生命周期方法比以往任何时候都更容易。它的每一个生命周期方法通常都包含一组不相关的逻辑。组件可能使用 componentDidMount() 执行数据获取，另一方面，此方法可能包含一些设置事件侦听器的无关逻辑。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而如果我们想对内置的React Hooks（如 useState 和 useEffect ）做同样的事情，我们将这样做：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用这两个Hooks编写的代码更加直接和简洁。此外，如果我们在团队中工作，它很容易理解和工作。使用 componentDidMount() 、 componentDidUpdate() 和 componentWillUnmount() 这样的生命周期方法，它们会被单独处理，但是当使用React Hooks时，你可以只用 useEffect() Hook来处理所有这些。

3.在没有类的情况下使用更多的React功能：在React中没有Hooks的概念之前，它的组件主要使用基于类的组件。一直使用类制作组件需要很大的（有时是不必要的）努力，因为你总是需要在类、渲染道具、HOC等之间切换。多亏了React Hooks，现在你可以在不使用函数组件的情况下完成所有这些任务。

> 使用基于类的组件：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 使用功能组件：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果比较这两种方法，使用函数式组件的第二种方法是一种明显更简单的代码，可以得到相同的结果。你不需要给一个类实例分配空间，然后调用 render() 函数。相反，您只需调用该函数。

### The useState Hook

> useState Hook允许您在功能组件中使用本地应用状态。

它返回一个有状态值沿着一个函数来更新它。下面是它的基本调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

setState 函数用于更新状态，它接受一个新的状态值（ newState ）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以下是关于 useState 的一些关键点：

1.声明一个状态变量：要声明一个状态变量，你只需要用一些初始值调用 useState ：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.更新状态变量：这里需要调用 useState 返回的update函数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3.使用多状态变量：您可以使用多状态变量并在功能组件中更新它们，如以下示例所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

4.使用对象状态变量：您也可以使用整个对象作为传递给 useState 的初始值。它不会自动合并更新对象。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

新的状态对象将变为。第0号。

5.功能编号0#：调用 useState 后返回的updater函数也可以像我们在基于类的组件的 setState 中所做的那样接受一个函数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这两种形式对于调用 updateValue 都是有效的。

### 3\. The useEffect Hook

> useEffect 钩子接受用于执行任何副作用的函数。

传递给 useEffect 的函数将在渲染提交到屏幕后运行。这些效果在渲染完成后运行，但我们也可以选择根据某些值的变化来激发它们。

以下是 useEffect 的调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为了产生基本的副作用，我们将在下面的示例中使用 useState 和 useEffect Hooks：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

useEffect 块在运行 handleClick 函数后更新当前选项卡/浏览器窗口的标题。

以下几点对 useEffect 很有帮助：

**1.清理效果**：我们必须在一段时间后清除效果，这通常是通过从传递给 useEffect 的效果函数中返回一个函数来完成的。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

运行此清理函数是为了防止在从UI中删除组件之前发生内存泄漏。此外，如果我们编写一个新的cleanup，那么在执行下一个效果之前，会先清理前一个效果。

**2.创建多个效果**：要添加多个效果，我们可以在一个函数组件中有多个 useEffect 调用，如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**3.跳过效果的多种方法**：我们可以跳过 useEffect 调用，而不是在每次渲染时调用它。这可以通过多种方式实现：

> 使用数组依赖：这里，`useEffect`被传递了一个值的数组。这样，当我们传递的值生成时，在挂载 \* 和 \* 时，效果函数将被调用。下面是一个示例：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 使用空数组依赖：在这种情况下，`useEffect`被传递一个空数组`[]`。现在只有在挂载时才调用effect函数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 不使用数组依赖：我们可以完全跳过效果而不提供任何数组依赖。效果函数将在每次渲染后运行：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. Rules of Hooks

为了有效地使用React Hooks，我们在使用它们时需要遵循两个基本规则：

#### 1.在顶层调用钩子：此规则规定：

不要在循环、条件或嵌套函数中调用Hooks。

这意味着您要确保每次组件呈现时都以相同的顺序调用Hooks。这有助于在多次 useState 和 useEffect 调用之间保留应用的状态。

因此，在任何早期返回之前，您应该始终确保在函数的顶层使用Hooks。React依赖于Hooks被调用的顺序，所以如果我们每次都以相同的顺序调用Hook，它看起来像这样：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但是如果我们把一个Hook调用 persistForm 放在一个条件中：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那么我们在条件中使用钩子就违反了第一条规则！现在顺序更改如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

React不知道第二个 useState 调用返回什么。因此，跳过了多个钩，导致问题。

#### 2.仅从React函数调用Hooks：此规则规定：

> 不要从常规的JavaScript函数调用Hooks。

通过遵循这一规则，我们可以确保组件的所有有状态逻辑代码从其源代码中清晰可见。

而不是从常规函数调用它们，我们可以：

> 从React函数组件调用Hooks。

> 从自定义Hooks调用Hooks。

## Intermediate level — React Hooks Cheat Sheet

### 1\. Building custom Hooks

除了使用提供的 useState 和 useEffect Hooks之外，我们还可以根据需要制作自定义Hook，将组件逻辑提取到可重用的函数中。

> 自定义钩子是一些函数，其名称以“use”开头，可以调用其他钩子。

它不需要特定的签名。在制作自定义Hook时应记住以下几点：

**1.提取自定义Hook**：当我们想要在两个JavaScript函数之间共享逻辑，然后将其提取到第三个函数时，使用自定义Hook。我们应该确保只在自定义Hook的顶层无条件地调用其他Hook。

Here’s an example:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在这个例子中，我们看到我们的 useFriendStatus 钩子使用 useState 和 useEffect 钩子来沿着一些自定义代码来订阅朋友的状态。

**2.使用自定义Hook**：在创建自定义Hook之后，我们可以在组件内部的任何地方使用它。例如，如果我们有下面的自定义Hook，名为 useBoolean ，它返回状态和函数来更新数组中的状态：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

请注意，我们将 initialState 作为参数沿着传递其默认值（ false ）。回到 App 组件，我们可以通过向它传递初始状态并使用其返回值来显示状态并更新它来使用此Hook，如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. The useContext Hook

useContext Hook使您不必依赖Context消费者。

> 它接受一个上下文对象并返回该上下文的当前上下文值。

上下文对象来自 React.createContext ，它由树中调用组件上方最近的 <MyContext.Provider> 的 value prop确定。

这是它的调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

React的Context使用 createContext 顶级API初始化。下面是一个示例：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果没有定义 value prop，则 createContext 函数采用初始值，该初始值也是默认值。我们可以在示例 Book 组件中使用它，如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

useState 钩子将Context作为参数来获取 value 。现在，如果我们想从 useContext 编写上面的 Book 组件，我们最终会得到以下内容：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3\. The useReducer Hook

> useReducer 钩是 useState 的替代品。当你有一个涉及多个子值的复杂状态逻辑，或者当状态依赖于前一个时，它通常是更可取的。

它具有以下调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

它接受一个类型为 (state, action) => newState 的reducer，并返回与 dispatch 方法配对的当前状态。下面是一个使用此Hook的示例：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们可以通过传递一个 init 函数作为它的第三个参数来惰性地初始化状态。从这个函数返回的任何东西都作为状态对象返回。这里有一个例子来说明这一点：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. The useCallback Hook

> useCallback 钩子用于返回传递的回调的备忘录化版本，该版本仅在其中一个依赖项发生更改时才会更改。

在向优化的子组件传递回调以防止不必要的呈现时，它很有用。这是它的调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

要将 useCallback 与内联函数一起使用，我们可以如下调用它：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里， 子组件有 doSomething prop，它通过调用 useCallback Hook传递。

### 5\. The useMemo Hook

> useMemo 钩子允许记住昂贵的函数，以避免在每次渲染时调用它们。

你传递一个“create”函数和一个依赖数组，它将输出它的memoized值。此Hook具有以下调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在使用 useMemo 钩时应记住以下几点：

> 它只会在你传递的依赖项之一发生变化时重新计算记忆化的值。

> 我们不应该在它的调用中添加副作用;它们应该属于 useEffect Hook。

> 在初始呈现期间， useMemo 调用 compute ，记录结果，并返回到其组件。

> 如果我们不提供任何数组，那么在使用 useMemo 的组件的每个渲染上都会计算一个新值。

假设我们有一个 组件：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

每当组件重新渲染时，我们可以使用 useMemo(() => factorialOf(number), \[number\]) 在这里记住阶乘计算，如下面更新的代码所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 6\. The useRef Hook

> useRef 钩子返回一个可变的 ref 对象，其 .current 属性被初始化为传递的参数 (initialValue) 。

它具有以下调用签名：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以下几点是关于 useRef 的基本要点：

> useRef 充当一个“盒子”，可以在其 .current 属性中保存可变值。

> 这个钩子创建一个普通的JavaScript对象。useRef() 和自己创建 { current: ... } 对象之间的区别在于， useRef 在每次渲染时都为您提供相同的 ref 对象。

> 如果你改变了 .current 属性，它不会导致重新渲染。Hook不会在其内容更改时通知您。

> 引用的值被持久化，即，它在组件重新渲染之间保持相同。

> 引用也可以访问DOM元素。为此，我们需要引用您想要访问的元素的 ref 属性。

下面是一个例子，当组件挂载时，我们需要访问DOM元素以关注输入字段：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在创建一个引用以保存 inputRef 中的输入元素之后，它被分配给输入字段的 ref 属性。挂载后，React将 inputRef.current 设置为input元素。

## Advance level — React Hooks Cheat Sheet

### 1\. Testing React Hooks

如果你的测试解决方案不依赖于React内部，那么用Hooks测试组件与我们通常测试组件的方式没有什么不同。

让我们假设我们有以下组件，它计算您单击按钮的次数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们现在可以使用React DOM或React测试库来测试它，以减少样板代码。但是让我们看看如何用普通代码测试它。为了确保行为与浏览器中发生的情况相匹配，我们将代码渲染和更新包装到多个 ReactTestUtils.act() 调用中，如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. Data fetching with React Hooks

数据获取是我们在使用React应用程序时看到的一种非常典型的模式。但是如果你在特定的应用程序组件中使用Hooks，那么这里是你应该如何获取数据。

首先，假设我们有一个基本的 App 组件，它显示了一个项目列表：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

状态和状态更新函数都来自 useState 钩子。现在，让我们在这里使用Axios库获取数据。我们可以实现我们的效果挂钩如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但是如果你运行这个应用程序，你会看到代码被困在一个循环中。当组件装载时，效果钩子运行，但也当它更新时。我们在每次获取数据后设置状态。为了解决这个问题，我们只想在组件挂载时获取数据。

因此，我们应该提供一个空数组作为 useEffect 钩子的第二个参数，如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为了进一步提高代码质量，我们可以在 useEffect 中使用 async 函数，以便它在Promise中返回一个清理函数。所以我们的最终代码将是：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3\. Creating a loading indicator with Hooks

使用与上面相同的数据加载示例，我们可以开始实现基本的加载指示器。为此，我们将使用 useState Hook添加另一个状态值：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在，在我们的 useEffect 调用中，我们可以为 setIsLoading 设置 true 和 false 值的切换：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一旦在组件装入或URL状态更改时调用了该效果以获取数据，则加载状态将设置为true。以下是修改后的完整代码：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. Data aborting using Hooks

我们经常看到组件状态被设置，即使组件已经被挂载。因此，我们还希望中止组件中的数据获取，这样我们就不会遇到任何错误或循环。

我们可以使用效果钩子，它带有一个清理函数，当组件卸载时运行。让我们在下面的示例中使用它来防止数据获取：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在这里，我们使用了一个名为 didCancel 的布尔值，这样数据获取代码就可以知道组件的状态（已挂载或未挂载）。如果卸载，则该标志将设置为 true ，这将防止在异步解析数据获取后设置组件状态。

### 5\. Getting previous props or states with Hooks

有时我们需要一个组件的前一个道具来清理一个使用过的效果。为了说明这一点，假设我们有一个基于 userId props订阅套接字的效果。如果这个属性改变了，我们想取消订阅之前的 userId ，然后订阅下一个。

为此，我们可以使用一个cleanup函数和 useEffect 函数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里，当 userId 改变时，首先运行 ChatAPI.unsubscribeFromSocket(3) ，然后运行 ChatAPI.unsubscribeFromSocket(4) 。因此，cleanup函数为我们做了这项工作。它在一个闭包中捕获前一个 userId 。

## Conclusion — React Hooks Cheat Sheet

在这个React Hooks备忘单中，我们涵盖了与Hooks相关的所有主要主题。从为什么需要它，到如何释放Hook的超级能力来有效地管理和处理您的应用状态，所有内容都包含了相关的示例。

我们希望这份备忘单能在你未来或之前的React应用中对你有所帮助。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 推荐阅读

-   • [作为 React 开发人员应该知道的 16 个库](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485819&idx=1&sn=fe4cfda3830a72adfafb2c2804b0b8fc&chksm=fbcf66fbccb8efedff65b29a753cc813cb701201ae47721bc57af04554c2357240448392e8af&scene=21#wechat_redirect "作为 React 开发人员应该知道的 16 个库")
    
-   • [Taro](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485444&idx=1&sn=2d78a1d57b658cd75292e6393c0828bb&chksm=fbcf6784ccb8ee92f8febc9953d7b686a7b9bd744aaa885eea235e77dc71cf86a3a84f7dd058&scene=21#wechat_redirect "Taro")
    
-   • [Tailwind CSS](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485325&idx=1&sn=b331feb00b37772a7c2d2713932aef93&chksm=fbcf680dccb8e11b88b69b85f059b9ed1a796ac1508acdc0b8f77b611dbc468fc64c3f3da646&scene=21#wechat_redirect "Tailwind CSS")
    
-   • [TypeScript](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485270&idx=1&sn=bf3c3320742d1b8d90e9bac02ba81dd4&chksm=fbcf68d6ccb8e1c0b33c7c09e7c5dc3232fe2eaece683d8d42e63a13446b1e7e0391512ae1f9&scene=21#wechat_redirect "TypeScript")
    
-   • [vite](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485242&idx=1&sn=7ad1817c062e0dca44d35a350ca7531d&chksm=fbcf68baccb8e1acf13f1b9289e23176730a13969ca1eecb518b3751b6de26cd04c06f51de2b&scene=21#wechat_redirect "vite")
    
-   • [react面试题（一）](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247484997&idx=1&sn=41d6c2944753f54058aff1d4e005f242&chksm=fbcf69c5ccb8e0d37f90488e3d633211ea84e48e2615cd7c7d0a6147a606f637ab777ba5f580&scene=21#wechat_redirect "react面试题（一）")
    
-   • [React面试题（二）](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485006&idx=1&sn=2f5604a8c68b8495347d41fb35f750d0&chksm=fbcf69ceccb8e0d8f394aa5203e9707aef5553c5a3b729c20b4365ce97139ed86d9fb2f1e083&scene=21#wechat_redirect "React面试题（二）")
    
-   • [React面试题（三）](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485014&idx=1&sn=c0f93d26c0dbfc472cd47aa6940a9d44&chksm=fbcf69d6ccb8e0c0b0f7b31ed3f877c2b9d00d5c4b872fb6c955fdf9ba4d77b756cd4c069135&scene=21#wechat_redirect "React面试题（三）")
    
-   • [React面试题（四）](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485065&idx=1&sn=f48036020a55741dda28ffdbcacc4832&chksm=fbcf6909ccb8e01ffcd377a2db158650f603795d90d6e5a2e857bdbc424f1672a563f672e97d&scene=21#wechat_redirect "React面试题（四）")
    
-   • [React面试题（五）](https://mp.weixin.qq.com/s?__biz=MzU1NTg0MjI4Nw==&mid=2247485103&idx=1&sn=d3d0d58ed35c08da3073359ff346c505&chksm=fbcf692fccb8e0391958673acf14f9c29b47171b5999c862cc4292a429f065f170090e39bf82&scene=21#wechat_redirect "React面试题（五）")
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)