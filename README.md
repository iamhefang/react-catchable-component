该组件不再维护,请使用[react-catchable](https://github.com/iamhefang/react-catchable)

# react-catchable-component
在React组件异常导致整个页面崩溃的解决方案

## 安装
```shell
npm i react-catchable-component;
```

## 使用

```tsx
import catchable from "react-catchable-component";

class XXXComponent extends React.Component{
    render(){
        
        return <div></div>
    }
}

export default catchable(XXXComponent);
```
