## 横方向の中央配置

1. inline, inline-block 要素の中央配置：親要素に text-align: center; を設定する。
2. normal flow における block 要素の中央配置：width を設定して、左右の margin を auto とする。
3. position: absolute;要素の中央配置：width を設定して、left: 0; right: 0;として、左右の margin を auto とする。position: fixed;の要素も同じ。

## 縦方向の中央配置

1. 1 行のテキストの垂直中央配置：line-height を親要素の height と同じ値にする。
2. inline 要素または inline-block 要素内の複数行のテキストの垂直中央配置：display: inline-block;にして、上下 padding を設定する。問題は親要素の高さを変更してしまうことである。
3. position: absolute;要素の中央配置：height を設定して、top: 0; bottom: 0;として、上下の margin を auto とする。position: fixed;の要素も同じ。
