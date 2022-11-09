using System;

namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            //Actividad de desarrollo de la UF1 de David Nuñez Merino

            int filas1, filas2, columnas1, columnas2;//Creamos las variables que utilizaremos para definir el tamaño de la matriz


            Console.WriteLine("\t\t\t\t#### BIENVENIDO AL CREADOR DE MATRICES ####\n");

            //El usuario introduce las filas y columnas de las matrices
            Console.WriteLine("\n\tIntroduce numero de filas para la primera matriz:");
            filas1 = Convert.ToInt32(Console.ReadLine());


            Console.WriteLine("\n\tIntroduce numero de columnas para la primera matriz");
            columnas1 = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("\n\tIntroduce numero de filas para la segunda matriz");
            filas2 = Convert.ToInt32(Console.ReadLine());


            Console.WriteLine("\n\tIntroduce numero de columnas para la segunda matriz");
            columnas2 = Convert.ToInt32(Console.ReadLine());

            //Definimos las matrices con los datos que ha introducido el usuario
            int[,] matriz1 = new int[filas1, columnas1];
            int[,] matriz2 = new int[filas2, columnas2];


            Console.WriteLine("\n\t\tAhora introduciremos los valores de la primera matriz: ");

            //El usuario incorpora a la matriz los datos de cada fila y columna para la primera matriz
            for (int x = 0; x < filas1; x++)
            {
                for (int z = 0; z < columnas1; z++)
                {
                    Console.WriteLine("\n\tintroduce el valor para la fila: {0}  y la columna {1} ", (x + 1), (z + 1));
                    matriz1[x, z] = int.Parse(Console.ReadLine());

                }
            }


            Console.WriteLine("\n\t\tAhora introduciremos los valores de la segunda matriz: ");
            
            //El usuario incorpora a la matriz los datos de cada fila y columna para la segunda matriz
            for (int v = 0; v < filas2; v++)
            {
                for (int y = 0; y < columnas2; y++)
                {
                    Console.WriteLine("\n\tIntroduce el valor para la fila: {0}  y la columna {1} ", (v + 1), (y + 1));
                    matriz2[v, y] = int.Parse(Console.ReadLine());
                }

            }
            //Mostramos los valores de la primera matriz
            Console.WriteLine("\n\n\t\tMatriz 1\n");

            for (int x = 0; x < filas1; x++)
            {
                for (int z = 0; z < columnas1; z++)
                {
                    Console.Write("\t" + matriz1[x, z]);
                }

                Console.WriteLine();
            }

            Console.Write("\n--------------------------------------------------------------------------------------------------");
            //Mostramos los valores de la segunda matriz
            Console.WriteLine("\n\n\t\tMatriz 2\n");

            for (int v = 0; v < filas2; v++)
            {
                for (int y = 0; y < columnas2; y++)
                {
                    Console.Write("\t" + matriz2[v, y]);
                }

                Console.WriteLine();
            }

            bool igNum = true;//Creamos una variable booleana para poder comparar los datos
            
            //Comparamos filas y columnas
            if (filas1 != filas2 || columnas1 != columnas2)
                
                
                Console.WriteLine("\n\t\tLas matrices no pueden ser comparadas");

            else
            {
                
                Console.WriteLine("\n\t\tLas matrices pueden ser comparadas");


                //Comparamos datos matrices
                for (int a = 0; a < matriz1.GetLength(0); a++)
                {
                    for (int b = 0; b < matriz2.GetLength(1); b++)
                    {
                        if (matriz1[a, b] != matriz2[a, b])
                        {
                            igNum = false;
                        }

                    }

                }

                if (igNum)//Si igNum es verdadero

                {
                    
                    Console.WriteLine("\n\t\tLas matrices son iguales");
                }

                else// si igNum es falso
                {
                    
                    Console.WriteLine("\n\t\tLas matrices no son iguales");
                }
            }

            Console.WriteLine("\n\n\t\t\t\t#### FIN DEL CREADOR DE MATRICES ####");
            Console.ReadLine();//Fin del programa
        }
    }
}
        
    

