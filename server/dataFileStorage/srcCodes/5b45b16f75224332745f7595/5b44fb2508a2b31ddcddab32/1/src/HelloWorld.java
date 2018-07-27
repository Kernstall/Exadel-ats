import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.util.Scanner;

public class HelloWorld
{
	public static void main(String[] args)
	{
		System.out.println("Hello World!");
		Calculator calc=new Calculator();
		System.out.println("2+2="+calc.sum(2,2));
	}
}
