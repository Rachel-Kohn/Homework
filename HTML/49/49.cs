using System;
using System.Collections.Generic;

namespace Homework49 {
    class Program {
        static void Main(string[] args) {
            List<string> colors = new List<string> { "red", "green", "blue" };
            List<string> patterns = new List<string> { "striped", "checked", "plain" };
            List<Shirt> shirts = new List<Shirt>();

            foreach (string color in colors) { // Create combinations
                foreach (string pattern in patterns) {
                    shirts.Add(new Shirt(color, pattern));
                }
            }
            foreach (Shirt shirt in shirts) {// Print shirts
                Console.WriteLine(shirt);
            }
        }
    }
    class Shirt {
        public string Color { get; set; }
        public string Pattern { get; set; }

        public Shirt(string color, string pattern) {
            Color = color;
            Pattern = pattern;
        }

        public override string ToString() {
            return $"{Color}:{Pattern}";
        }
    }
}