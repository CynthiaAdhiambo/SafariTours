#!/bin/bash
read -p "enter var1:" a
read -p "enter var2:" b
read -p "enter var3:" c
read -p "enter var4:" d
echo $((a+b+c+d))
total= $a+$b+$c+$d
echo $total